import { Link } from "react-router-dom";

function Home() {

    return (
        <div>
            <h1>home</h1>
            <br/>
            <Link to="/resources">Resource Page</Link>
            <br/>
            <Link to="/accounts">Account Page</Link>
            <br/>
            <Link to="/protocols">protocols</Link>
            <br/>
            <Link to="/plans">plans</Link>
        </div>
    )
}

export default Home;