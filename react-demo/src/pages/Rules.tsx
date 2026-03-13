import { useEffect, useState } from "react";
interface GeneralRule{
  title: string;
  text: string;
}

const Pravila = () => {
  const token = sessionStorage.getItem("token");
  const [rules, setRules] = useState<GeneralRule[]>([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({ title: "", text: "" });
  const [openRules, setOpenRules] = useState<string[]>([]);

  const toggleRule = (title: string) => {
    if (openRules.includes(title)) {
      setOpenRules(openRules.filter((r) => r !== title));
    } else {
      setOpenRules([...openRules, title]);
    }
  };
  const handleAdd = async () => {
    if (!form.title || !form.text) {
      setMessage("Vsa polja so obvezna!");
      setIsError(true);
      return;
    } 
    try {
      const response = await fetch("/app/rules/create", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify({title: form.title, text: form.text})
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Pravilo uspešno dodano!");
        setIsError(false);
        setForm({ title: "", text: "" });
      } else {
        setMessage(data.error || "Napaka pri dodavanju pravila.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error adding rule:", error);
      setMessage("Prišlo je do napake pri dodajanju pravila.");
      setIsError(true);
    }
  };
  const getRules = async () => {
    try {
      const response = await fetch("/app/rules/list", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setRules(data.rules);
        setMessage("");
        setIsError(false);
      } else {
        setMessage(data.error || "Napaka pri pridobivanju pravil.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
      setMessage("Prišlo je do napake pri pridobivanju pravil.");
      setIsError(true);
    }
  };
  useEffect(() => {
    getRules();
  }, []);

  return (
    <div>
      <h1>Pravila skupnosti</h1>
      <ol>
        {rules.map((rule: GeneralRule) => (
          <li key={rule.title}>
            <h3
            onClick={() => toggleRule(rule.title)}
            style={{ cursor: "pointer" }}
            >
              {openRules.includes(rule.title) ? "▾" : "▸"} {rule.title}
            </h3>

            {openRules.includes(rule.title) && (
              <p>{rule.text}</p>
            )}
          </li>
        ))}
      </ol>
      <h1>Dodaj pravilo (samo moderatorji)</h1>
      <div className= "okvir1">
        <input className="input1"
          type= "text"
          placeholder="Naslov"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea className="textarea1"
          placeholder="Besedilo pravila..."
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
        <button className="button1" onClick={handleAdd}>Dodaj pravilo</button>
        {message && (
          <p
            className="mt-3 text-center"
            style={{ color: isError ? "red" : "green" }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
};



export default Pravila;