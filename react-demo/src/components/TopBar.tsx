import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function TopBar() {
    const { isLoggedIn} = useAuth();
    return(
        <header>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">MCForAdults</h2>
                <div className="btn-group" role="group" aria-label="Zavihtki">
                    <Link to="/" className="btn btn-outline-primary" role="button">O NAS</Link>
                    <Link to="/pravila" className="btn btn-outline-primary" role="button">PRAVILA</Link>
                    <Link to="/zac-funkcije" className="btn btn-outline-primary" role="button">ZAČASNE FUNKCIJE</Link>
                    <Link to="/serverid" className="btn btn-outline-primary" role="button">KAKO SE PRIDRUŽITI</Link>
                    <Link to={isLoggedIn? "/profil" :"/prijava"} className="btn btn-outline-primary" role="button">{isLoggedIn ? "PROFIL" : "PRIJAVA"}</Link>
                    <Link to="/clani" className="btn btn-outline-primary" role="button">ČLANI</Link>
                </div>
            </div>
        </header>
    );
}

export default TopBar;