import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Profil from "./pages/Profile";
import Users from "./pages/Users";
import Pravila from "./pages/Rules";
import ServerID from "./pages/ServerID";
import Vloge from "./pages/Vloge";

function App() {
  return (
    <>
      <TopBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pravila" element={<Pravila />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/clani" element={<Users />} />
          <Route path="/serverid" element={<ServerID />} />
          <Route path="/vloge" element={<Vloge />} />
        </Routes>
      </div>
    </>
    
  );
}

export default App
