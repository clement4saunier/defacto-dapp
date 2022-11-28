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

        <div className="parent" style={{display: "flex", marginTop: 'var(--space-xl)', marginBottom: '30px'}}>
        <h3>Bounty</h3>
          <div className="bounty" style={{display: "flex"}}>
            <div className="child-1" style={{width: 75 + "%"}}>
              <input
                name="bounty"
                value={bounty}
                required
                style={{fontSize: 28 + 'px', width: 100 + "%"}}
                onChange={(e) => setBounty(e.target.value)}>
              </input>
            </div>
            <div className="child-2"style={{width: 25 + "%"}}>
              <select
               className="token"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
                style={{fontSize: 28 + 'px', width: 100 + "%"}}
                >
                {currencies.chain[chainId] &&
                  currencies.chain[chainId].map(({ name, address }, idx) => (
                    <option key={idx}>{name}</option>
                  ))}
              </select>
            </div>
          </div>

            <p>Choose a delegate</p>
          <div className="delegate" style={{display: "flex"}}>
              <div style={{width: "100%"}}>
                <select
                name="delegate"
                value={delegate}
                style={{fontSize: 28 + 'px', width: 100 + "%"}}
                onChange={(e) => setDelegate(e.target.value)}
                placeholder="Enter the name of your delegate of choice"
                >
                <option value="defacto">DeFacto</option>
              </select>
              </div>
          </div>
          <p>Choose when your request will expire</p>
              <div style={{width: 100 + "%"}}>
                <select
                  value={timer}
                  onChange={(e) => setTimer(e.target.value)}
                  required
                  style={{fontSize: 28 + 'px', whiteSpace: 'nowrap', width: 100 + "%"}}
                  >
                  <option value="24h">24H</option>
                  <option value="48H">48H</option>
                  <option value="72H">72H</option>
                  <option value="one week">1 week</option>
                  <option value="one month">1 month</option>
                </select>
              </div>
          </div>
          <button title="Submit" type="submit" style={{width: 100 + '%', fontSize: 36 + 'px', marginTop: 'var(--space-s)', marginBottom: '40px', color: 'var(--color-background)'}}>
            Post your request
          </button>
      </form>
    </>
  );
}
