import { h } from "preact";
import styles from "./loader.module.scss";

export default function(props) {
  return (
    <div className={styles.loader}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
      {props.message && <p className={styles.message}>{props.message}</p>}
    </div>
  );
}
