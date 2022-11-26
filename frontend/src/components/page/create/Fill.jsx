import { useCallback, useState } from "react";
import { useCreationContext } from "../Create";
import currencies from "../../../contracts/currencies.json";
import { useWeb3Context } from "../../context/Web3Provider";
import { useEffect } from "react";

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
    symbol,
    setSymbol,
    timer,
    setTimer,
    delegate,
    setDelegate,
    setConfirmed
  } = useCreationContext();
  const { chainId } = useWeb3Context();

  useEffect(() => {
    if (!(currencies && currencies.chain[chainId])) return;
    if (!symbol) {
      const defaultCurrency = currencies.chain[chainId][0];
      setToken(defaultCurrency.address);
      setSymbol(defaultCurrency.name);
    } else {
      setToken(
        currencies.chain[chainId].find(({ name }) => name === symbol).address
      );
    }
  }, [symbol, currencies, chainId]);

  const sendForm = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <>
      <h1>Create a request</h1>
      <div className="divider" />
      <form onSubmit={sendForm} id="createForm">
        <p>Fill out this form to submit your request through DeFacts. Be as accurate as possible in your inquiry.</p>
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
          <p>Enter the currency and amount you offer as bounty for your request</p>
          <span>
            <input
              name="bounty"
              value={bounty}
              required
              onChange={(e) => setBounty(e.target.value)}
            />{" "}
            {token && token.substring(0, 7)}{" "}
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            >
              {currencies.chain[chainId] &&
                currencies.chain[chainId].map(({ name, address }, idx) => (
                  <option key={idx}>{name}</option>
                ))}
            </select>
          </span>
        </div>
        <div className="questionForm">
          <p>
            Enter the duration of your bounty.
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
          <p>Enter the name of your delegate of choice</p>
            <select
              name="delegate"
              value={delegate}
              onChange={(e) => setDelegate(e.target.value)}
            >
              <option value='defacto'>DeFacto</option>
              <option value='afp'>AFP</option>
              <option value='amnesty'>Amnesty International</option>
              <option value='politifacts'>Politifacts</option>
            </select>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button title="Submit" type="submit">
            Add to verify
          </button>
        </div>
        <br />
      </form>
    </>
  );
}
