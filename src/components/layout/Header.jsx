import { useThemeContext } from "../context/ThemeProvider";

export default function Header() {
  const { theme, themes, setAndStoreTheme } = useThemeContext();

  function onThemeSet(v) {
    setAndStoreTheme(themes.find(({ name }) => name === v.target.value));
  }

  return (
    <header>
      <div>
        <h3 style={{ margin: 0 }}>dAppFoundation</h3>
      </div>
      <div>
        <select value={theme.name} name="language" onChange={onThemeSet}>
          {themes.map((_theme, idx) => (
            <option key={idx}>{_theme.name}</option>
          ))}
        </select>
        <button>connect wallet</button>
      </div>
    </header>
  );
}
