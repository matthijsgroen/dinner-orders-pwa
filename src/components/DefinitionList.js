import { h } from "preact";
import styles from "./DefinitionList.module.scss";

export default function DefinitionList(props) {
  return (
    <dl>
      {Object.keys(props.data).map((key) =>
        <div className={styles.item}>
          <dt className={styles.key}>{key}</dt>
          <dd className={styles.value}>{props.data[key]}</dd>
        </div>
      )}
    </dl>
  );
}
