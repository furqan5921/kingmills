const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const authMiddleware = require('../middleware/auth');

// Fetch user profil
// router.get('/profile/:id', async (req, res) => {
//   console.log("ok")
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id); // Exclude password
//     if (!user) throw new Error('User not found');
//     // res.json(user);

//     res.json({
//       referalId: user.referalId,
//       email: user.email,
//       wallet: user.wallet || 0,
//       username: user.username,
//       // userNo: user.userNo 
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


router.get('/api/name/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id, "id")

  try {
    // Find the user and wallet by ID
    const user = await User.findById(id);
    // const user = await User.find();
    // const wallet = await User_Wallet.findOne({ user: id });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with username, wallet balance, exposure balance, and email
    res.json({
      referalId: user.referalId,
      email: user.email,
      wallet: user.wallet || 0,
      username: user.username,
      // userNo: user.userNo 
    });
  } catch (error) {
    console.error('Error fetching user:', error);

    res.status(500).json({ message: error.message });
  }
});

module.exports = router;