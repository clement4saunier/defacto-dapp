import { createContext, useContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import Choose from "../settle/Choose";
import State from "../settle/State";
import Responses from "./Responses";

export const SettleContext = createContext(null);

export const useSettleContext = () => {
  return useContext(SettleContext);
};

export default function Settle() {
  const [grantedResponses, setGrantedResponses] = useState([]);
  const [steps] = useState([<Choose/>, <State/>]);
  const [step, setStep] = useState(0);
  const component = useMemo(() => steps[step], [step]);

  function onResponseSelect(responseId) {
    if (grantedResponses.find((id) => id === responseId)) {
      setGrantedResponses(grantedResponses.filter((id) => id !== responseId));
      return;
    }
    setGrantedResponses((arr) => [...arr, responseId]);
  }

  return (
    <SettleContext.Provider value={{grantedResponses, setGrantedResponses, onResponseSelect, next: () => setStep(s => s + 1)}}>
      {component}
    </SettleContext.Provider>
  );
}
