const express = require('express');
const router = express.Router();
const { googleLogin, confirmDeleteAccount } = require('../controllers/authController_supabase');
const { protect } = require('../middleware/authMiddleware_supabase');

router.post('/google-login', googleLogin);
router.post('/confirm-delete-account', protect, confirmDeleteAccount);

module.exports = router;
