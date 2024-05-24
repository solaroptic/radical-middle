import React, { useContext, useEffect, useState } from "react";
import styles from "../App.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import Menu from "../components/Menu";
import { AuthContext } from "../context/authContext";
import { useMediaQuery } from "@uidotdev/usehooks";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const nav = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 890px)");
  // console.log(postId, "🥼");
  const editData = {
    id: postId,
    title: post.title,
    desc: post.desc,
    img: post.img,
    cat: post.cat,
    content: post.cont,
  };

  const dirty = post.cont;

  console.log(dirty);

  // const handleEdit = () => {
  //   console.log(editData, "👩‍🚒");
  //   nav("/write", { state: editData });
  // };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://radical-middle.onrender.com/api/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://radical-middle.onrender.com/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className={styles.single}>
      <div className={styles["singleContentMain"]}>
        <h1>{post?.title}</h1>
        <h3>{post?.desc}</h3>
        <img
          src={post?.img}
          alt={post?.title}
          className={styles["single-img"]}
        />
        <div
          className={styles.singleContent}
          dangerouslySetInnerHTML={{ __html: dirty }}
        ></div>
        <div className={styles["single-user"]}>
          {post.userImg && (
            <img
              src={`../../img/${post?.img}`}
              className={styles["single-img"]}
            />
          )}
          <div className={styles["single-info"]}>
            <span className={styles["single-span"]}>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && (
            <div className={styles["single-edit"]}>
              <Link to="/write" state={{ editData }}>
                <FaRegEdit className={styles["single-icon"]} />
              </Link>
              <FaRegTrashAlt
                onClick={handleDelete}
                className={styles["single-icon"]}
              />
            </div>
          )}
        </div>
      </div>
      {!isSmallDevice && <Menu cat={post?.cat} />}
    </div>
  );
};

export default Single;
