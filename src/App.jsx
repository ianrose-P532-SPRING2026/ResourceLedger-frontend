import { HashRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import TestPage from "./Pages/TestPage";
import Resources from "./pages/Resources";
import Accounts from "./pages/Accounts";
import Protocols from "./pages/Protocols";

//might need this later idk
//<HashRouter basename='/ResourceLedger-frontend'></HashRouter>
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/protocols" element={<Protocols />} />
      </Routes>
    </HashRouter>
  );
}

export default App
