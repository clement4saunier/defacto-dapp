import { useState } from "react";
import { useCreationContext } from "../Create";

export default function Fill() {
  const {
    body,
    setBody,
    bounty,
    setBounty,
    title,
    setTitle,
    token,
    setToken,
    timer,
    setTimer,
    nbDelegates,
    setNbDelegates,
    delegates,
    setDelegates,
    setConfirmed
  } = useCreationContext();

  const delegatesList = [
    { label: "Delegate1", value: "Delegate_1" },
    { label: "Delegate2", value: "Delegate_2" },
    { label: "Delegate3", value: "Delegate_3" },
    { label: "Delegate4", value: "Delegate_4" },
    { label: "Delegate5", value: "Delegate_5" }
  ];
  const [delegatesChoosen, setDelegatesChoosen] = useState("");

  const sendForm = (e) => {
    e.preventDefault();
    const info = { body, bounty, token, timer, nbDelegates, delegatesChoosen };
    console.log(info);
    setConfirmed(true);
  };

  return (
    <>
      <h1>Create a request</h1>
      <p>Lorem ipsum</p>
      <div className="divider" />
      <form onSubmit={sendForm} id="createForm">
        <p>is it true ? don't wait...ask! (add more details you can):</p>
        <h3>Title</h3>
        <textarea
          name="title"
          style={{ minHeight: "2em" }}
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Description</h3>
        <textarea
          name="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="textAreaBody"
        />
        <h3>Bounty</h3>
        <div className="questionForm">
          <p>how can you pay to find out if it's true?</p>
          <span>
            <input
              name="bounty"
              value={bounty}
              required
              onChange={(e) => setBounty(e.target.value)}
            />
            <input
              name="bounty"
              value={token}
              required
              onChange={(e) => setToken(e.target.value)}
            />
            {/* <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select> */}
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
            onChange={function (e) {
              setNbDelegates(e.target.value);
              setDelegates([...Array(Number(e.target.value)).keys()]);
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
          {delegatesChoosen}
          {delegates.map((delegate, index) => (
            <select
              key={index}
              onChange={(e) =>
                setDelegatesChoosen(delegatesChoosen + e.target.value)
              }
            >
              {delegatesList.map((delegate, index) => (
                <option key={index} value={delegate.value}>
                  {delegate.label}
                </option>
              ))}
            </select>
          ))}
        </div>
        <button id="buttonSendForm" title="Submit" type="submit">
          Add to verify
        </button>
      </form>
    </>
  );
}
