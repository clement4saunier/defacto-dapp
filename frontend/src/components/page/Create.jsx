import { useState } from "react";
import { CreateStyle } from "../../styles/Create.css";

export default function Create() {

  function getNbSelectDelegate(nbDelegates) {
    return ([...Array(nbDelegates)].map((elementInArray, index) => ( 
        // <div className={elementInArray} key={index}> Whatever needs to be rendered repeatedly </div> 
        <select>
          <option value="delegate1">delegate1</option>
          <option value="delegate2">delegate2</option>
          <option value="delegate3">delegate3</option>
          <option value="delegate4">delegate4</option>
          <option value="delegate5">delegate5</option>
        </select>
    )));
  }


  const [body, setbody] = useState("");
  const [bounty, setbounty] = useState(0);
  const [token, setToken] = useState("BTC");
  const [timer, setTimer] = useState("72H");
  const [nbDelegates, setNbDelegates] = useState(2);

  

  const [selectDelegate, setSelectDelegate] = useState(getNbSelectDelegate(nbDelegates));

  // const selectDelegate = [...Array(nbDelegates)].map((elementInArray, index) => ( 
  //   <div className={elementInArray} key={index}> Whatever needs to be rendered repeatedly </div> 
  // ))

    // <select>
    //   <option value="delegate1">delegate1</option>
    //   <option value="delegate2">delegate2</option>
    //   <option value="delegate3">delegate3</option>
    //   <option value="delegate4">delegate4</option>
    //   <option value="delegate5">delegate5</option>
    // </select>


  const sendForm = (e) => {
    e.preventDefault();
    const info = { body, bounty, token, timer, nbDelegates };
    console.log(info);
  };

  return (
    <div>
      <h1>Create a request</h1>
      <div>
        <form onSubmit={sendForm} id="createForm">
          <p>is it true ? don't wait...ask! (add more details you can):</p>
          <textarea
            name="body"
            required
            onChange={(e) => setbody(e.target.value)}
            id="textAreaBody"
          />
          <div className="questionForm">
            <p>how can you pay to find out if it's true?</p>
            <span>
              <input
                name="bounty"
                value={bounty}
                required
                onChange={(e) => setbounty(e.target.value)}
              />
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              >
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </span>
          </div>
          <div className="questionForm">
            <p>
              how long do the fact-checkers have to verify the information?
              <br />
              (small delay implies big gas)
            </p>
            <select
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              required
            >
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
              onChange={function(e) {
                setNbDelegates(e.target.value)
                setSelectDelegate(getNbSelectDelegate(e.target.value))
              }}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            {selectDelegate}
          </div>
          <button id="buttonSendForm" title="Submit" type="submit">
            Add to verify
          </button>
        </form>
      </div>
    </div>
  );
}
