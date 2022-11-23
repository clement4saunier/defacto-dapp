import Icon from "../content/Icon";
import { useThemeContext } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import useWalletRequest from "../hooks/useWalletRequest";
import { useWeb3Context } from "../context/Web3Provider";

export default function Header() {
  let navigate = useNavigate();
  const { theme, themes, setAndStoreTheme } = useThemeContext();
  const { requestAccounts } = useWalletRequest();
  const { account } = useWeb3Context();

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
          Statement list <Icon crypto="search" />
        </button>
        <button onClick={() => navigate("/create")}>
          Place a bounty <Icon crypto="send-in" />
        </button>
      </div>
      <div>
        <select value={theme.name} name="theme" onChange={onThemeSet}>
          {themes.map((_theme, idx) => (
            <option key={idx}>{_theme.name}</option>
          ))}
        </select>
        {!account ? (
          <button onClick={requestAccounts}>connect wallet</button>
        ) : (
          <button>{account.substring(0, 7)}</button>
        )}
      </div>
    </header>
  );
}
