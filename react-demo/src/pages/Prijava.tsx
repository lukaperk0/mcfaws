import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Prijava = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Vsa polja so obvezna!");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("/app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token); 
        login(data.token); 
        setMessage(data.message);
        setIsError(false);
        navigate("/profil");
      } else {
        setMessage(data.error || "Napaka pri prijavi");
        setIsError(true);
      }
    } catch (err) {
      setMessage("Napaka pri povezavi s strežnikom");
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="mb-3 text-center">Prijava</h2>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Uporabniško ime"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Geslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={handleLogin}
      >
        Prijava
      </button>

      <p className="mt-3 text-center">Še nimate računa?</p>

      <button
        type="button"
        className="btn btn-secondary w-100"
        onClick={() => (window.location.href = "/registracija")}
      >
        Ustvarite račun
      </button>

      {message && (
        <p
          className="mt-3 text-center"
          style={{ color: isError ? "red" : "green" }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Prijava;
