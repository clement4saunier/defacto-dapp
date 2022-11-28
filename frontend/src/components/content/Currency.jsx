import { useMemo } from "react";

const colors = new Map([
  ["BTC", { background: "orange", color: "white" }],
  ["USDC", { background: "#0a76c6", color: "white" }],
  ["wETH", { background: "#f01977", color: "white" }],
  ["USDT", { background: "#00a27c", color: "white" }]
]);

export default function Currency({ symbol, address }) {
  const style = useMemo(() => colors.get(symbol) ?? {}, [symbol, colors]);

  return (
    <span style={style} className="highlight">
      {symbol ?? "???"}
    </span>
  );
}
