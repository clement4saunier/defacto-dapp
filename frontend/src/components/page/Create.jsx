import { useMemo } from "react";
import { createContext, useContext, useState } from "react";
import { CreateStyle } from "../../styles/Create.css";
import Fill from "./create/Fill";
import Mint from "./create/Mint";

export const CreationContext = createContext(null);

export const useCreationContext = () => {
  return useContext(CreationContext);
};

export default function Create() {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  const [bounty, setBounty] = useState(0);
  const [token, setToken] = useState();
  const [symbol, setSymbol] = useState();
  const [timer, setTimer] = useState("24");
  const [delegate, setDelegate] = useState('defacto');
  const [confirmed, setConfirmed] = useState(false);
  const step = useMemo(() => (!confirmed ? <Fill /> : <Mint />), [confirmed]);

  return (
    <>
      <CreationContext.Provider
        value={{
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
        }}
      >
        {step}
      </CreationContext.Provider>
    </>
  );
}
