import Icon from "../content/Icon";
import { useThemeContext } from "../context/ThemeProvider";
import {useNavigate} from 'react-router-dom';

export default function Header() {
  let navigate = useNavigate();
  const { theme, themes, setAndStoreTheme } = useThemeContext();

  function onThemeSet(v) {
    setAndStoreTheme(themes.find(({ name }) => name === v.target.value));
  }

  return (
    <header>
      <div>
        <h3 style={{ margin: 0 }}><Icon crypto="list"/> Defacto</h3>
      </div>
      <div>
        <button onClick={() => navigate("/")}>Home <Icon crypto="info"/></button>
        <button onClick={() => navigate("/list")}>List <Icon crypto="search"/></button>
        <button onClick={() => navigate("/create")}>Create <Icon crypto="send-in"/></button>
      </div>
      <div>
        <select value={theme.name} name="theme" onChange={onThemeSet}>
          {themes.map((_theme, idx) => (
            <option key={idx}>{_theme.name}</option>
          ))}
        </select>
        <button>connect wallet</button>
      </div>
    </header>
  );
}
