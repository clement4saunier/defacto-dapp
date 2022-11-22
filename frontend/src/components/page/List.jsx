import Request from "../content/Request";
import styles from "./List.module.css";

export default function List() {
  return (
    <>
      <h1>A là une</h1>
      <p>The most recent open bounties</p>
      <div className={styles.grid}>{Array(10).fill(<Request />)}</div>
    </>
  );
}
