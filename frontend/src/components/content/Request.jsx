import styles from "./Request.module.css";
import { useNavigate } from "react-router-dom";

export default function Request() {
  let navigate = useNavigate();

  return (
    <div className={[styles.card, "card"].join(" ")} onClick={() => navigate("/request")}>
      <div>
        <h3>Title of the request</h3>
        <p>
          Submitted by <a>0x012389</a>
        </p>
      </div>
      <div>
        <p>
          active <br />1 BTC
        </p>
      </div>
    </div>
  );
}
