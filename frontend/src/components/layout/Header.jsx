import Icon from "../content/Icon";
import { useThemeContext } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import useWalletRequest from "../hooks/useWalletRequest";
import { useWeb3Context } from "../context/Web3Provider";
import { explorers } from "../../contracts/explorers";
import { useMemo } from "react";

export default function Header() {
  let navigate = useNavigate();
  const { theme, themes, setAndStoreTheme } = useThemeContext();
  const { requestAccounts } = useWalletRequest();
  const { account, chainId } = useWeb3Context();
  const chainName = useMemo(() => explorers.get(chainId) ? explorers.get(chainId).name : "Unknown", [chainId, explorers]);

  function onThemeSet(v) {
    setAndStoreTheme(themes.find(({ name }) => name === v.target.value));
  }

  return (
    <header>
      <div>
        <h3 style={{ margin: 0, cursor: 'pointer'}} onClick={() => navigate("/")}>
          <Icon crypto="list" /> DeFacts
        </h3>
      </div>
      <div>
        {/* <button onClick={() => navigate("/")}>
          Home <Icon crypto="info" />
        </button> */}
        <button onClick={() => navigate("/list")}>
          View request list <Icon crypto="list" />
        </button>
        <button onClick={() => navigate("/create")}>
          Submit a request <Icon crypto="send-in" />
        </button>
      </div>
      <div>
        <select value={theme.name} name="theme" onChange={onThemeSet}>
          {themes.map((_theme, idx) => (
            <option key={idx}>{_theme.name}</option>
          ))}
        </select>
        <button className="unselected">{chainName}</button>
        {!account ? (
          <button onClick={requestAccounts}>connect wallet</button>
        ) : (
          <button>{account.substring(0, 7)}</button>
        )}
      </div>
    </header>
  );
}
