import { useEffect, useState } from "react";
interface GeneralVloga{
  title: string;
  text: string;
  members: string[];
}

const Vloge = () => {
    const token = sessionStorage.getItem("token");
    const [vloge, setVloge] = useState<GeneralVloga[]>([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [form, setForm] = useState({ title: "", text: "" });
    const [openVloge, setOpenVloge] = useState<string[]>([]);

    const togglePosition = (title: string) => {
        if (openVloge.includes(title)) {
        setOpenVloge(openVloge.filter((v) => v !== title));
        } else {
        setOpenVloge([...openVloge, title]);
        }
    };
    const addPosition = async () => {
        if (!form.title || !form.text) {
        setMessage("Vsa polja so obvezna!");
        setIsError(true);
        return;
        }
        try {
        const response = await fetch("/app/positions/create", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: form.title, text: form.text })
        });
        const data = await response.json();
        if (data.success) {
            setVloge([...vloge, { title: form.title, text: form.text, members: [] }]);
            setForm({ title: "", text: "" });
            setIsError(false);
            setMessage(data.message || "Vloga uspešno dodana!");
        } else {
            setMessage(data.message);
            setIsError(true);
        }
        } catch (error) {
        setMessage("Prišlo je do napake pri dodajanju vloge.");
        setIsError(true);
        }
    };
    const getVloge = async () => {
        try {
        const response = await fetch("/app/positions/getAll", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
            });
            const data = await response.json();
            if (data.success) {
                setVloge(data.positions);
            } else {
                setMessage(data.message);
                setIsError(true);
            }
        } catch (error) {
        setMessage("Prišlo je do napake pri pridobivanju vlog.");
        setIsError(true);
        }
        };
    useEffect(() => {
        getVloge();
    }, []);

    return (
        <div>
            <h1>Vloge</h1>
            <ul>
                {vloge.map((vloga: GeneralVloga) => (
                    <li key={vloga.title}>
                        <h3 
                        onClick={() => togglePosition(vloga.title)}
                        style= {{ cursor: "pointer" }}
                        >
                            {openVloge.includes(vloga.title) ? "▼ " : "► "}
                            {vloga.title}

                        </h3>
                        {openVloge.includes(vloga.title) && (
                                <p>{vloga.text}</p>
                        )}
                    </li>
                ))}
            </ul>
            <h1>Dodaj vlogo (samo moderatorji)</h1>
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
                <button className="button1" onClick={addPosition}>Dodaj pravilo</button>
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
}

export default Vloge;
