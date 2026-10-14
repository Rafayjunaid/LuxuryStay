// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// export const signup = async (req, res) => {
//   try {

//     const {
//       name,
//       email,
//       password
//     } = req.body;

//     const existingUser =
//       await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email already registered"
//       });
//     }

//     const hashedPassword =
//       await bcrypt.hash(password, 10);

//     const profilePic = req.file
//       ? `/uploads/${req.file.filename}`
//       : "";

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       profilePic
//     });

//     res.status(201).json({
//       message: "Account created successfully",

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//         role: user.role
//       }
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };


// export const login = async (req, res) => {
//   try {

//     const {
//       email,
//       password
//     } = req.body;

//     const user =
//       await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found"
//       });
//     }

//     const passwordMatch =
//       await bcrypt.compare(
//         password,
//         user.password
//       );

//     if (!passwordMatch) {
//       return res.status(400).json({
//         message: "Incorrect password"
//       });
//     }

//     res.json({
//       message: "Login successful",

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//         role: user.role
//       }
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };


// export const updateProfile = async (req, res) => {
//   try {

//     const {
//       id
//     } = req.params;

//     const {
//       name,
//       email,
//       password
//     } = req.body;

//     const user =
//       await User.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found"
//       });
//     }

//     if (
//       email &&
//       email !== user.email
//     ) {

//       const emailExists =
//         await User.findOne({
//           email,
//           _id: {
//             $ne: id
//           }
//         });

//       if (emailExists) {
//         return res.status(400).json({
//           message: "Email already registered"
//         });
//       }

//       user.email = email;
//     }

//     if (name) {
//       user.name = name;
//     }

//     if (password) {
//       user.password =
//         await bcrypt.hash(
//           password,
//           10
//         );
//     }

//     if (req.file) {
//       user.profilePic =
//         `/uploads/${req.file.filename}`;
//     }

//     await user.save();

//     res.json({
//       message: "Profile updated successfully",

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//         role: user.role
//       }
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };


// export const logout = async (req, res) => {

//   res.json({
//     message: "Logout successful"
//   });

// };

import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const profilePic = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic
    });

    res.status(201).json({
      message: "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    res.json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const updateProfile = async (req, res) => {
  try {

    const {
      id
    } = req.params;

    const {
      name,
      email,
      password
    } = req.body;

    const user =
      await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (
      email &&
      email !== user.email
    ) {

      const emailExists =
        await User.findOne({
          email,
          _id: {
            $ne: id
          }
        });

      if (emailExists) {
        return res.status(400).json({
          message: "Email already registered"
        });
      }

      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password =
        await bcrypt.hash(
          password,
          10
        );
    }

    if (req.file) {
      user.profilePic =
        `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export const logout = async (req, res) => {

  res.json({
    message: "Logout successful"
  });

};