import { useCallback, useState } from "react";
import { useCreationContext } from "../Create";
import currencies from "../../../contracts/currencies.json";
import { useWeb3Context } from "../../context/Web3Provider";
import { useEffect } from "react";
import Styles from './Fill.css';

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


        <div className="test">
        <div className="parent">
          <h3>Bounty</h3>

          <div className="bounty" style={{}}>
              <input
                name="bounty"
                value={bounty}
                required
                style={{fontSize: 42 + 'px'}}
                onChange={(e) => setBounty(e.target.value)}>
              </input>
              <select
               className="token"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
                style={{fontSize: 42 + 'px'}}
                >
                {currencies.chain[chainId] &&
                  currencies.chain[chainId].map(({ name, address }, idx) => (
                    <option key={idx}>{name}</option>
                  ))}
              </select>
          </div>

          <div className="delegate">
            <p /*style={{fontSize: 15 + 'px'}}*/>Enter the name of your delegate of choice</p>
              <div>
                <select
                name="delegate"
                value={delegate}
                style={{fontSize: 42 + 'px', minWidth: 100 + '%', width: 0}}
                onChange={(e) => setDelegate(e.target.value)}
                placeholder="Enter the name of your delegate of choice"
                >
                <option value="defacto">DeFacto</option>
              </select>
              </div>
              <div>
              <select
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                required
                style={{fontSize: 42 + 'px', minWidth: 100 + '%', whiteSpace: 'nowrap'}}
                >
                <option value="24h">24H</option>
                <option value="48H">48H</option>
                <option value="72H">72H</option>
                <option value="one week">1 week</option>
                <option value="one month">1 month</option>
              </select>
              </div>
          <button title="Submit" type="submit" style={{width: 100 + '%', fontSize: 42 + 'px', marginTop: 'var(--space-xl)', color: 'var(--color-background)'}}>
            Add to verify
          </button>
          </div>
          </div>
      </div>

        {/* <div className="questionForm">
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
            style={{fontSize: 40 + 'px'}}
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
            <input
              name="delegate"
              value={delegate}
              onChange={(e) => setDelegate(e.target.value)}
            />
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button title="Submit" type="submit">
            Add to verify
          </button>
        </div>
        <br /> */}







        {/*
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
            style={{fontSize: 40 + 'px'}}
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
            <input
              name="delegate"
              value={delegate}
              onChange={(e) => setDelegate(e.target.value)}
            />
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <button title="Submit" type="submit">
            Add to verify
          </button>
        </div>
        <br /> */}
      </form>
    </>
  );
}
