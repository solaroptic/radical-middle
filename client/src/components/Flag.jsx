import styles from "../App.module.css";

const Flag = () => {
  return (
    <div className={styles.flagContainer}>
      <div className={`${styles.flag} ${styles.red} `}></div>
      <div className={`${styles.flag} ${styles.white} `}></div>
      <div className={`${styles.flag} ${styles.blue} `}></div>
    </div>
  );
};

export default Flag;
