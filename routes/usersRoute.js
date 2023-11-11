// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Register a new user
// router.post('/register', async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     const user = await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });

// // User login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email, password });

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(401).json({ message: 'Login failed' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Login failed' });
//   }
// });

// // Get all users
// router.get('/getallusers', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error while fetching users:', error);
//     res.status(500).json({ message: 'Failed to retrieve users' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function verifyToken ( req, res, next) {

  const token1 = req.header('Authorization').split(' ')[1];

  if (!token1) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token1, process.env.SECRET_KEY);
    if(decoded.user_id===req.user_id)
    {
      const userId = decoded.userId;
      const email = decoded.email;
  
      const user = await User.findById(userId);
  
      if (user && user.isAdmin) {
        req.userId = userId; 
        req.email = email;
        next();
      } 
      else{
        res.status(401).json({ message: 'Access denied'});
      }
    }
    else{
      res.status(401).json({ message: 'Access denied'});      
    }
     
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}


router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      // Hash the user's password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, email, password: hashedPassword });
      const user = await newUser.save();
      const token = jwt.sign(
        {
          userId: user._id,
          userName: user.name,
        },
        process.env.SECRET_KEY, // Your secret key
        {
          expiresIn: process.env.TOKEN_EXPIRATION, // Token expiration time (e.g., '1h' for 1 hour)
        }
      );
      res.status(201).json({ token, user: { _id: user._id,name: user.name,email:user.email,isAdmin: user.isAdmin} });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      // Compare the hashed password with the provided password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, user is authenticated

        // Create a JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userName: user.name,
          },
          process.env.SECRET_KEY, // Your secret key
          {
            expiresIn: process.env.TOKEN_EXPIRATION, // Token expiration time (e.g., '1h' for 1 hour)
          }
        );

        // Send the token and user data in the response
        res.status(200).json({ token, user: {_id: user._id,name: user.name,email:user.email,isAdmin: user.isAdmin} });
      } else {
        // Passwords do not match
        res.status(401).json({ message: 'Login failed' });
      }
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get all users
router.get('/getallusers', verifyToken , async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error while fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
});

router.post("/changename"  , async (req, res) => {
  try {
    const { newname ,userid} = req.body;

    const updatedUser = await User.findByIdAndUpdate(userid, { name: newname }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(201).json({ message: 'Name updated successfully' });
  } catch (error) {
    console.error('Error submitting name:', error);
    res.status(500).json({ error: 'An error occurred while updating the name' });
  }
});


module.exports = router;
