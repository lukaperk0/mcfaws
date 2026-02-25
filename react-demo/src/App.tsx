import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Profil from "./pages/Profile";

function App() {
  return (
    <>
      <TopBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </>
    
  );
}

export default App
