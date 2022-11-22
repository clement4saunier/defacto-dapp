import "./styles/theme.css";
import "./styles/global.css";
import { ThemeProvider } from "./components/context/ThemeProvider";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate
} from "react-router-dom";
import Header from "./components/layout/Header";
import Page from "./components/layout/Page";
import Home from "./components/page/Home";
import Create from "./components/page/Create";
import List from "./components/page/List";
import Team from "./components/page/Team";
import Request from "./components/page/Request";
import Web3Provider from "./components/context/Web3Provider";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Web3Provider>
          <div className="app">
            <Header />
            <Page>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/create" element={<Create />} />
                <Route path="/team" element={<Team />} />
                <Route path="/request" element={<Request />} />
              </Routes>
            </Page>
          </div>
        </Web3Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
