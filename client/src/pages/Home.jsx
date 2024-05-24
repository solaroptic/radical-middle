import React, { useEffect, useState } from "react";
import styles from "../App.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "@uidotdev/usehooks";
import Flag from "../components/Flag";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const smallScreen = useMediaQuery("only screen and (max-width: 890px)");

  const cat = useLocation().search;

  useEffect(() => {
    console.log("lard");
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://radical-middle.onrender.com/api/posts/${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    return html;
  };

  console.log(posts, "👩‍🦳");
  return (
    <div className={styles.home}>
      <Flag />
      <h1 className={styles.banner}>The Radical Middle</h1>
      <h3>
        ...pushing RADICAL ideology: being reasonable, being balanced, and
        avoiding the extremes of both the right and the left.
      </h3>
      <div className={styles.posts}>
        {Array.isArray(posts) ? (
          posts?.map((post) => (
            <div
              className={`${styles.post} ${smallScreen ? styles.small : ""} `}
              key={post.id}
            >
              <div className={styles.img}>
                <img src={post?.img} alt="look!" />
              </div>
              <div className={styles.content}>
                <div>
                  <Link className={styles.link} to={`/post/${post.id}`}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                  </Link>
                  <p className={styles.postDesc}>{getText(post.desc)}</p>
                </div>
                <Link className={styles.link} to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;

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
