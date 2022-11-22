import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreateStyle} from "../../styles/Create.css";

const sendForm = (e) => {
  e.preventDefault()
  console.log(e)
}

export default function Create() {
  let navigate = useNavigate();
  // const [info, setInfo] = useState("");
  const [price, setPrice] = useState(0);
  const [token, setToken] = useState('BTC');
  const [timer, setTimer] = useState('72H');
  const [nbDelegates, setNbDelegates] = useState(1);
  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>

      <h1>Create a request</h1>
      <div id="create">
        <form onSubmit={sendForm} id="createForm">
          <p>is it true ? don't wait...ask!
            (add more details you can)
          </p>
          <textarea 
            name="info"
            required
            style={{width: 50 + 'em', height: 20 + 'em'}}
          />
          <p>how can you pay to find out if it's true?</p>
          <input
            name="bounty"
            value={price}
            required
            onChange={(e) => (setPrice(e.target.value))}
            style={{width: 20 + 'em'}}
          />
          <select 
            value={token} 
            onChange={(e) => (setToken(e.target.value))}
            required
            >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
          <p>how long do the fact-checkers have to verify the information?<br />
             (small delay implies big gas)</p>
          <select 
            value={timer} 
            onChange={(e) => (setTimer(e.target.value))}
            required>
            <option value="24h">24H</option>
            <option value="48H">48H</option>
            <option value="72H">72H</option>
            <option value="one week">1 week</option>
            <option value="one month">1 month</option>
          </select>
          <p>How many delegates do you want ?</p>
          <select 
            value={nbDelegates} 
            onChange={(e) => (setNbDelegates(e.target.value))}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button title="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
}