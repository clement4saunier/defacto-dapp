import Responses from "../request/Responses";
import { useSettleContext } from "../request/Settle";

export default function Choose() {
  const { grantedResponses, onResponseSelect, next } = useSettleContext();

  return (
    <>
      <h3>Choose responses to grant</h3>
      <Responses selected={grantedResponses} onSelect={onResponseSelect} />
      <button onClick={next} disabled={grantedResponses && grantedResponses.length <= 0}>Next</button>
    </>
  );
}
