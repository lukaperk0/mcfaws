import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface GeneralUser{
  _id: string;
  username: string;
  role: string;
}
const Users = () => {
  const [users, setUsers] = useState<GeneralUser[]>([]);
  const [message, setMessage] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/app/auth/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Napaka pri pridobivanju uporabnikov");
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setMessage("Napaka pri povezavi s strežnikom");
      console.error(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  function getRoleColor(role: string): string {
  switch (role) {
    case 'admin':     return '#a51403'; // rdeča
    case 'moderator': return '#ffcc16'; // oranžna
    case 'member':  return '#00a946'; // zelena
    case 'user':      return '#1ec7d3'; // siva
    default:          return '#000000'; // črna
  }
}

  return (
    <div>
      <h2>Uporabniki</h2>

      {message && <p>{message}</p>}

      <ul>
        {users.map((user) => (
          <li key={user._id} className="text-xl" style={{ color: getRoleColor(user.role) }}>
            {user.username} {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;