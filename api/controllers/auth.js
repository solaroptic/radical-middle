import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//input validation needed use Jonas list
export const register = async (req, res) => {
  try {
    // Check for existing user
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [req.body.email, req.body.username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json("user already exists");
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Insert new user
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [req.body.username, req.body.email, hash]
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error"); // Handle errors appropriately
  }
};
export const login = async (req, res) => {
  console.log("rat");

  try {
    // Find user by username
    const [user] = await db.execute("SELECT * FROM users WHERE username = ?", [
      req.body.username,
    ]);

    if (user.length === 0) {
      return res.status(404).json("user missing");
    }

    // Validate password
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user[0].password
    );
    if (!isValidPassword) {
      return res.status(400).json("wrong username or password");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id }, process.env.SESSION_SECRET);

    // Exclude password from response data
    const { password, ...other } = user[0];

    // Set access token cookie, name of cookie is access_token
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
    console.log();
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("user has logged out");
};
// export const login = (req, res) => {
//   console.log("cat");
//   const q = "SELECT * FROM users WHERE username = ?";

//   db.query(q, [req.body.username], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length === 0) {
//       return res.status(404).json("user missing");
//     }

//     const isValidPassword = bcrypt.compareSync(
//       req.body.password,
//       data[0].password
//     );
//     if (!isValidPassword)
//       return res.status(400).json("wrong username or password");

//     const token = jwt.sign({ id: data[0].id }, "elvescompton");
//     const { password, ...other } = data[0];

//     res
//       .cookie("access_token", token, {
//         //access token is name of cookie
//         httpOnly: true,
//         //nothing in the browser can reah the cookie, only happens during api reqs
//       })
//       .status(200)
//       .json(other);
//   });
// };

// export const register = async (req, res) => {
//   console.log("🌱", "register cntrlr FN");

//   const q = "SELECT * FROM users WHERE email = ? OR username = ?";

//   db.query(q, [req.body.email, req.body.name], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length) {
//       return res.status(409).json("user already exists");
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
//     const values = [req.body.username, req.body.email, hash];
//     db.query(q, [values], (err, data) => {
//       if (err) return res.json(err);
//       return res.status(200).json("User created");
//     });
//   });
// };
