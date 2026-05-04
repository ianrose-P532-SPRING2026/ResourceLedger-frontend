import { HashRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard";
import Protocols from "./pages/Protocols";
import Plans from "./pages/Plans";
import Resources from "./pages/Resources";
import TransactionLogs from "./pages/TransactionLogs";
import Accounts from "./pages/Accounts";

//might need this later idk
//<HashRouter basename='/ResourceLedger-frontend'></HashRouter>
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/protocols" element={<Protocols />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/logs" element={<TransactionLogs />} />
      </Routes>
    </HashRouter>
  );
}

export default App
