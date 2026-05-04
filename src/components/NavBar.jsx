import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <div className="nav">
            <NavLink className="navbutton" to="/">Dashboard</NavLink>
            <NavLink className="navbutton" to="/accounts">Accounts</NavLink>
            <NavLink className="navbutton" to="/resources">Resources</NavLink>
            <NavLink className="navbutton" to="/protocols">Protcols</NavLink>
            <NavLink className="navbutton" to="/plans">Plans</NavLink>
            <NavLink className="navbutton" to="/logs">Transaction Logs</NavLink>
        </div>
    );
}

export default NavBar;