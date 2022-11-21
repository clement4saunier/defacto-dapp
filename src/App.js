import "./styles/global.css";
import "./styles/theme.css";
import ThemeProvider from "./components/context/ThemeProvider";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Page from "./components/layout/Page";
import Home from "./components/page/Home";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <Header />
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Page>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
