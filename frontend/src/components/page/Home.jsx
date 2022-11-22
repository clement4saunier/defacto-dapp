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
      <p>Defacto is a decentralize platform where you can ask if a news is real or fake.</p>
      <button onClick={() => navigate('/list')}>List <Icon crypto="send-in"/></button>
      <button onClick={() => navigate('/create')}>Create <Icon crypto="send-in"/></button>
      <h2>What is it about ?</h2>
      {text}
      <h2>How does it work ?</h2>
      <p> We have 3 differents roles on the platform.</p>
      <ul>
        <li>The <strong>Asker</strong> will post a request with details of it, the information to be verify, the bounty and the timer 
        for the fact-checker, and the number of delegates. Anybody can be a Asker </li>
        <li>The <strong>Fact-Checker</strong>. His role represent the most of the work, he will investigate to found if yes or not the 
        information is real/fake. Let's suppose that a request was posted, the fact-checker have the possibility to choose if he wants 
        to verify it and he will communicate his report with the most sources as possible before the end of the timer. This time again 
        anyone can be a Fact-checker.</li>
        <li>The <strong>Deleguate</strong>. If the fact-checker will provide most of the works it's the delegate who has the most 
        tricky part, he will validates or not if the fact-checker is right or if it is a bad report. When the deleguate prononces the 
        result the bounty is automatically share between the fact-checker and the delegaute.
        </li>
      </ul>
    </>
  );
}
