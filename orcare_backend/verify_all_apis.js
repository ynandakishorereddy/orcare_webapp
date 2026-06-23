require('dotenv').config();
const { supabase } = require('./config/supabase');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testSupabase() {
    console.log('\n--- Testing Supabase Connection ---');
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) {
            console.error('❌ Supabase Query Error:', error.message);
        } else {
            console.log('✅ Supabase connected successfully!');
            console.log('Sample data length:', data.length);
        }
    } catch (e) {
        console.error('❌ Supabase Connection Failed:', e.message);
    }
}

async function testEmail() {
    console.log('\n--- Testing Brevo SMTP Connection ---');
    const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST,
        port: process.env.BREVO_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.BREVO_SMTP_USER,
            pass: process.env.BREVO_SMTP_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('✅ Brevo SMTP connected successfully!');
    } catch (e) {
        console.error('❌ Brevo SMTP Connection Failed:', e.message);
    }
}

async function testGemini() {
    console.log('\n--- Testing Gemini AI Connection ---');
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Say 'API works'");
        const response = await result.response;
        console.log('✅ Gemini API connected successfully! Response:', response.text().trim());
    } catch (e) {
        console.error('❌ Gemini API Connection Failed:', e.message);
    }
}

async function runTests() {
    await testSupabase();
    await testEmail();
    await testGemini();
    console.log('\n--- Tests Complete ---');
    process.exit(0);
}

runTests();
