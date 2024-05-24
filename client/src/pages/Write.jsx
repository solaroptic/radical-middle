import React, { useState } from "react";
import styles from "../App.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { useMediaQuery } from "@uidotdev/usehooks";

const Write = () => {
  const { state } = useLocation();
  const nav = useNavigate();
  const data = state?.editData;
  const [content, setContent] = useState(data?.content || "");
  const [title, setTitle] = useState(data?.title || "");
  const [subheading, setSubheading] = useState(data?.desc || "");
  const [img, setImg] = useState(null);
  const [savedImg, setSavedImg] = useState(data?.img || "");
  const [cat, setCat] = useState(data?.cat || "");
  const smallScreen = useMediaQuery("only screen and (max-width: 890px)");

  //         userInfo.id,
  const sendToCloud = async (data) => {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/duysbh0j0/image/upload",
      {
        method: "post",
        body: data,
      }
    ).then((res) => res.json());
    return response.secure_url;
  };

  const upload = async () => {
    try {
      if (img === null) {
        return;
      }
      if (img.type === "image/jpeg" || img.type === "image/png") {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "fabiz_site");
        formData.append("cloud_name", "duysbh0j0");
        const imageUrl = await sendToCloud(formData);
        console.log("🕵️‍♀️!!!!", imageUrl);
        return imageUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgReturned = await upload();

    try {
      state
        ? await axios.patch(
            `https://radical-middle.onrender.com/api/posts/${state.editData.id}`,
            {
              title,
              desc: subheading,
              cont: content,
              img: imgReturned
                ? imgReturned
                : savedImg
                ? savedImg
                : "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJ0fGVufDB8fDB8fHww",
              cat,
            },
            { withCredentials: true }
          )
        : await axios.post(
            `https://radical-middle.onrender.com/api/posts`,
            {
              title,
              desc: subheading,
              cont: content,
              img: imgReturned
                ? imgReturned
                : "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJ0fGVufDB8fDB8fHww",
              cat,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${styles["write-container"]} ${
        smallScreen ? styles.small : ""
      }`}
    >
      <div className={styles["write-content"]}>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={subheading}
          type="text"
          placeholder="Subheading"
          onChange={(e) => setSubheading(e.target.value)}
        />
        <div className={styles["write-editor"]}>
          <ReactQuill
            className={styles["write-quill"]}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
      </div>

      <div
        className={`${styles["write-menu"]} ${
          smallScreen ? styles.smallRow : ""
        }`}
      >
        <div className={styles["write-item"]}>
          <h1>Category</h1>
          <div className={styles["write-cat"]}>
            <input
              type="radio"
              checked={cat === "platform"}
              name="cat"
              value="platform"
              id="platform"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="platform">Platform</label>
          </div>
          <div className={styles["write-cat"]}>
            <input
              type="radio"
              checked={cat === "divide"}
              name="cat"
              value="divide"
              id="divide"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="divide">Divide</label>
          </div>
          <div className={styles["write-cat"]}>
            <input
              type="radio"
              checked={cat === "legislation"}
              name="cat"
              value="legislation"
              id="legislation"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="legislation">Legislation</label>
          </div>
          <div className={styles["write-cat"]}>
            <input
              type="radio"
              checked={cat === "intl"}
              name="cat"
              value="intl"
              id="intl"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="intl">Intl/Military</label>
          </div>
        </div>
        <div className={styles["write-item"]}>
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label className={styles["write-file"]} htmlFor="file">
            Upload Image
          </label>
          <div
            className={`${styles["write-buttons"]} ${
              smallScreen ? styles.small : ""
            }`}
          >
            <button className={styles["write-button"]}>Save as draft</button>
            <button className={styles["write-button"]} onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
