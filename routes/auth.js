const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ راوت لتسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  console.log('✅ Request Received:', req.body); // للتأكيد إن البيانات وصلت
  try {
    const { name, email, password, role } = req.body;

    // فحص إن كل البيانات موجودة
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    // إنشاء مستخدم جديد
    const user = new User({ name, email, password, role });
    await user.save();

    // الرد بالنجاح
    res.status(201).json({ message: 'تم تسجيل المستخدم بنجاح', user });
  } catch (err) {
    console.log('❌ Error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;