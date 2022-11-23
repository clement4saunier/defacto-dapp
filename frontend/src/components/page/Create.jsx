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
  const [amount, setAmount] = useState(0);
  const [timer, setTimer] = useState("72H");
  const [nbDelegates, setNbDelegates] = useState(1);
  const [delegates, setDelegates] = useState([...Array(1).keys()]);
  const delegatesList = [
    { label: "Delegate1", value: "Delegate_1" },
    { label: "Delegate2", value: "Delegate_2" },
    { label: "Delegate3", value: "Delegate_3" },
    { label: "Delegate4", value: "Delegate_4" },
    { label: "Delegate5", value: "Delegate_5" }
  ];
  const [delegatesChoosen, setDelegatesChoosen] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const step = useMemo(() => !confirmed ? <Fill/> : <Mint/>, [confirmed]);

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
          timer,
          setTimer,
          nbDelegates,
          setNbDelegates,
          delegates,
          setDelegates,
          setConfirmed
        }}
      >
        {step}
      </CreationContext.Provider>
    </>
  );
}
