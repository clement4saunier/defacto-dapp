import { useState } from "react";

const sendForm = (e) => {
  e.preventDefault()
  console.log(e)
}

export default function Create() {
  const [info, setInfo] = useState("");
  const [nbDelegates, setNbDelegates] = useState(0);
  return (
    <div className="">
      {/* mettre l'info, la bounty, le temps, choisir le nombre de délégués, choisir quel délégué */}

      <h1>Bonjour</h1>
      <form onSubmit={sendForm}>
        <p>is it true ? don't wait...ask!</p>
        <input
          name="info"
          style={{width: 50 + 'em', height: 20 + 'em'}}
        />
        <p>how can you pay to find out if it's true?</p>
        <input
          name="bounty"
          style={{width: 20 + 'em'}}
        />
        <select>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
        <p>how long do the fact-checkers have to verify the information? (small delay implies big gas)</p>
        <select>
          <option value="24h">24H</option>
          <option value="48H">48H</option>
          <option value="72H">72H</option>
          <option value="one week">1 week</option>
          <option value="one month">1 month</option>
        </select>
        <p>How many delegates do you want ?</p>
        <input
          name="nbDelegates"
          type="number"
          // onChange={() => {setNbDelegates(nbDelegates + 1)}}
          style={{width: 4 + 'em'}}
        />
        <button title="Submit" type="submit" />
      </form>
    </div>
  );
}