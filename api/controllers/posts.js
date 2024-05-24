import { db } from "../db.js";
import jwt from "jsonwebtoken";
//input validation needed use Jonas list
export const getAllPosts = async (req, res) => {
  console.log("👩‍🦳");
  try {
    const query = req.query.cat
      ? "SELECT * FROM posts WHERE cat = ?"
      : "SELECT * FROM posts";
    //returns about if url has ?cat=about at end
    const [data] = await db.execute(
      query,
      req.query.cat ? [req.query.cat] : []
    );
    //req.query.cat must not be undefined or "TypeError: Bind parameters must not contain undefined. To pass SQL NULL specify JS null" will happen

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error"); // Handle errors appropriately
  }
};
export const getPost = async (req, res) => {
  try {
    const query =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `cont`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ? ";
    const [data] = await db.execute(query, [req.params.id]);
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error"); // Handle errors appropriately
  }
};
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, process.env.SESSION_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token Not Valid");

    try {
      const postId = req.params.id;
      const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
      await db.execute(q, [postId, userInfo.id]);
      return res.status(200).json("Post deleted");
    } catch (error) {
      console.error(error);
      return res.status(500).json("You can only delete your own post"); // Handle errors appropriately
    }
  });
};
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, process.env.SESSION_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token Not Valid");

    try {
      const q =
        "INSERT INTO posts(`title`,`desc`,`img`,`date`,`uid`,`cat`,`cont`) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.date,
        userInfo.id,
        req.body.cat,
        req.body.cont,
      ];

      await db.execute(q, values);
      return res.status(200).json("Post created");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Error posting"); // Handle errors appropriately
    }
  });
};
/////////////////////////////////////////////
/////////////////////////////////////////////

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, process.env.SESSION_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token Not Valid");
    try {
      const postId = req.params.id;

      const q =
        "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=?, `cont`=? WHERE `id` = ? AND `uid` = ?";
      //proper syntax for updating mysql2 is UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;

      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.cont,
        postId,
        userInfo.id,
      ];

      await db.execute(q, values);
      return res.status(200).json("Post updated");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Error posting"); // Handle errors appropriately
    }
  });
};
