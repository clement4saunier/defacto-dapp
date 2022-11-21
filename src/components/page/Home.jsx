import { useState } from "react";

export default function Home() {
  const [text, setText] = useState(
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
      <h1>Hello</h1>
      {text}
      <h2>What is it about ?</h2>
      {Array(3).fill(text)}
      <h2>How does it work ?</h2>
      {Array(6).fill(text)}
    </>
  );
}
