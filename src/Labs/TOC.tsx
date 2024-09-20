import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        Aidan Sidloski
        Section CS4550 02 F24
        <li><Link to="Labs">Labs</Link></li>
        <li><Link to="Lab1">Lab 1</Link></li>
        <li><Link to="Lab2">Lab 2</Link></li>
        <li><Link to="Lab3">Lab 3</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><a id="wd-github" href="https://github.com/aidansid/kanbas-react-web-app">github</a></li>
      </ul>
    );
  }
  