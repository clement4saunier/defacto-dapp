import styles from "./Request.module.css";

export default function Request() {
  return (
    <div className={styles.card}>
      <div>
        <h3>Title of the request</h3>
        <p>
          Submitted by <a>0x012389</a>
        </p>
      </div>
      <div>
        <p>active <br/>1 BTC</p>
      </div>
    </div>
  );
}
