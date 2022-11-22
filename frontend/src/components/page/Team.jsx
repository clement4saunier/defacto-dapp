import { useState } from "react";
import Icon from "../content/Icon";
import styles from "./Team.module.css";

export default function Team() {
  const [members] = useState([
    { name: <><Icon crypto="block-explorer"/> Clément</>, title: "Lead dev", mail: "clement4saunier@gmail.com" },
    {
      name: <><Icon crypto="broadcast"/> Alexandre</>,
      title: "Backend dev",
      mail: "alexandre.schaffner@epitech.eu"
    },
    {
      name: <><Icon crypto="qr-code"/> Maxime</>,
      title: "Front-end dev",
      mail: "maxime.noel@epitech.eu"
    },
    {
      name: <><Icon crypto="block"/> Mickael</>,
      title: "Blockend dev",
      mail: "clement4saunier@gmail.com"
    }
  ]);

  return (
    <>
      <h1>Who are we ?</h1>
      <p>Our team includes 4 {"{EPITECH.}"} students</p>
      <div className={styles.members}>
        {members.map(({ name, title, mail }) => (
          <div className="card">
            <h3>{name}</h3>
            <p>{title}<br/>{mail}</p>
          </div>
        ))}
      </div>
    </>
  );
}
