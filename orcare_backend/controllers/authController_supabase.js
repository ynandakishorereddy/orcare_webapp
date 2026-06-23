const { supabase } = require('../config/supabase');
const jwt = require('jsonwebtoken');

// Generate JWT for backend authentication
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Google Login / Signup
// The frontend will send the Supabase access_token after successful OAuth
const googleLogin = async (req, res) => {
    const { access_token } = req.body;

    if (!access_token) {
        return res.status(400).json({ message: "No access token provided" });
    }

    try {
        // Verify token with Supabase and get user data
        const { data: { user }, error } = await supabase.auth.getUser(access_token);

        if (error || !user) {
            return res.status(401).json({ message: "Invalid access token" });
        }

        const email = user.email;
        const name = user.user_metadata?.full_name || email.split('@')[0];

        // Check if user exists in our public.users table
        let { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        let backendUser;

        if (fetchError && fetchError.code === 'PGRST116') {
            // User does not exist, create them
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert([{
                    name,
                    email,
                    age: null,
                    gender: 'Not specified',
                    language: 'English',
                    is_email_verified: true
                }])
                .select()
                .single();

            if (createError) throw createError;
            backendUser = newUser;
        } else if (fetchError) {
            throw fetchError;
        } else {
            // User exists
            backendUser = existingUser;
            
            // Ensure they are marked as verified (if legacy)
            if (!backendUser.is_email_verified) {
                await supabase.from('users').update({ is_email_verified: true }).eq('id', backendUser.id);
                backendUser.is_email_verified = true;
            }
        }

        // Generate our custom backend token
        const token = generateToken(backendUser.id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: backendUser.id,
                name: backendUser.name,
                email: backendUser.email,
                age: backendUser.age,
                gender: backendUser.gender,
                district: backendUser.district,
                state: backendUser.state,
                language: backendUser.language,
                isEmailVerified: backendUser.is_email_verified,
            }
        });
    } catch (error) {
        console.error('Google login error:', error.message);
        return res.status(500).json({ message: error.message || "Failed to authenticate with Google" });
    }
};

// @desc Confirm Delete Account
// Deletes the logged-in user directly (no OTP needed)
const confirmDeleteAccount = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { error: deleteError } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);

        if (deleteError) throw deleteError;

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (error) {
        console.error('Confirm delete account error:', error.message);
        return res.status(500).json({ message: error.message || "Failed to delete account" });
    }
};

module.exports = {
    googleLogin,
    confirmDeleteAccount
};
