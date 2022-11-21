import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../content/Icon";

export default function Home() {
  let navigate = useNavigate();
  const [text] = useState(
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  );

  return (
    <>
      <h1>Decentralized fact-checking and journalism platform</h1>
      {text}
      <button onClick={() => navigate('/list')}>List <Icon crypto="send-in"/></button>
      <button onClick={() => navigate('/create')}>Create <Icon crypto="send-in"/></button>
      <h2>What is it about ?</h2>
      {Array(3).fill(text)}
      <h2>How does it work ?</h2>
      {Array(6).fill(text)}
    </>
  );
}
