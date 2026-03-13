import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Registracija = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const register = async () => {
    if (!username || !password) {
      setMessage("Vsa polja so obvezna!");
      setIsError(true);
      return;
    }

    try {
        const response = await fetch("/app/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            setMessage(data.message);
            sessionStorage.setItem("token", data.token);
            login(data.token);
            setIsError(false);
            navigate("/profil");
        } else {
            setMessage("Registracija ni uspela: " + data.message);
            setIsError(true);
        }
    }
    catch (err) {
        setMessage("Napaka pri registraciji: " + (err as Error).message);
        setIsError(true);
        console.error(err);
    }
};

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="mb-3 text-center">Registracija</h2>
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
      onClick={register}
      >Registriraj se</button>

    {message && (  
      <div className={`alert ${isError ? "alert-danger" : "alert-success"} mt-3`}>
        {message}
      </div>
    )}
    </div>
    );
};

export default Registracija;
