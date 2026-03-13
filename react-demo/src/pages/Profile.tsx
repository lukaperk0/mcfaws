import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface UserProfile {
  username: string;
  role: string;
}

const Profil = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/prijava");
  };

  const fetchProfile = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        setMessage("Uporabnik ni prijavljen");
        return;
    }

    try {
        const response = await fetch("/app/auth/profile", {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
        });
        const data = await response.json();

        if (response.ok) {
        setProfile(data);
        setMessage("");
        } else {
        setMessage(data.message ||"Napaka pri pridobivanju profila");
        }
    } catch (err) {
        setMessage("Napaka pri povezavi s strežnikom");
    }
    };
  useEffect(() => {
    fetchProfile();
  }, []);

  return(
    <div className="container mt-5">
      {message && <p className="text-danger">{message}</p>}
      {profile && (
        <div>
          <h2>Profil uporabnika</h2>
          <p>Uporabniško ime: {profile?.username}</p>
          <p>Verificiran: {profile?.role === "verified" ? "Da" : "Ne"}</p>
          <p>Moderator: {profile?.role === "moderator" ? "Da" : "Ne"}</p>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Odjava
          </button>
        </div>
      )}
    </div>
  )
};

export default Profil;