import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {CreateStyle} from "../../styles/Create.css";


export default function Create() {
  let navigate = useNavigate();
  const [body, setbody] = useState("");
  const [bounty, setbounty] = useState(0);
  const [token, setToken] = useState('BTC');
  const [timer, setTimer] = useState('72H');
  const [nbDelegates, setNbDelegates] = useState(1);


  const sendForm = (e) => {
    e.preventDefault()
    const info = {body, bounty, token, timer, nbDelegates}
    console.log(info)
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>

      <h1>Create a request</h1>
      <div id="create">
        <form onSubmit={sendForm} id="createForm">
          <p>is it true ? don't wait...ask!
            (add more details you can):
          </p>
          <textarea 
            name="body"
            required
            onChange={(e) => (setbody(e.target.value))}
            id="textAreaBody"
          />
          <div className="questionForm">
            <p>how can you pay to find out if it's true?</p>
            <input
              name="bounty"
              value={bounty}
              required
              onChange={(e) => (setbounty(e.target.value))}
            />
            <select 
              value={token} 
              onChange={(e) => (setToken(e.target.value))}
              required
              >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          <div className="questionForm">
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
          </div>
          <div className="questionForm">
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
          </div>
          <button id="buttonSendForm" title="Submit" type="submit">Add to verify</button>
        </form>
      </div>
    </div>
  );
}