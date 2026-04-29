import { Link } from "react-router-dom";

function Home() {

    return (
        <div>
            <h1>haiiii</h1>
            <Link to="/test">Test Page :3</Link>
            <br/>
            <Link to="/resources">Resource Page :3</Link>
            <br/>
            <Link to="/accounts">Account Page :3</Link>
            <br/>
            <Link to="/protocols">protocols</Link>
            <br/>
            <Link to="/plans">plans</Link>
        </div>
    )
}

export default Home;