import React, { useEffect, useState } from "react";
import styles from "../App.module.css";
import axios from "axios";
//     img: "https://images.pexels.com/photos/3217673/pexels-photo-3217673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://radical-middle.onrender.com/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div className={styles.menu}>
      <h1>Related articles...</h1>
      {posts.map((post) => (
        <div className={styles["menu-post"]} key={post.id}>
          <img src={post.img} alt="cats" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;

// const posts = [
//   {
//     id: 1,
//     title: "Issues with BBQ",
//     desc: "It was a womderful fall day...Womdewrful has no ms os dsghhidgouhgfo",
//     img: "https://images.pexels.com/photos/3217673/pexels-photo-3217673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 2,
//     title: "Solutions with BBQ",
//     desc: "It was a womderful winter day...Womdewrful has no ms os dsghhidgouhgfo",
//     img: "https://images.pexels.com/photos/3217673/pexels-photo-3217673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 3,
//     title: "Issues with Aliens",
//     desc: "It was a womderful spring day...Womdewrful has no ms os dsghhidgouhgfo",
//     img: "https://images.pexels.com/photos/3217673/pexels-photo-3217673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
//   {
//     id: 4,
//     title: "Aliens with BBQ",
//     desc: "It was a womderful summer day...Womdewrful has no ms os dsghhidgouhgfo",
//     img: "https://images.pexels.com/photos/3217673/pexels-photo-3217673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   },
// ];
