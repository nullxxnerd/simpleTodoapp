export default function Navbar() {
  return (
    <div className="navbar">
    <div className="icon">
      {" "}
      <button>Todoer</button>
    </div>

    <div className="boxy">
      <button className="navBut">Features</button>
      <button className="navBut">For Teams</button>
      <button className="navBut"> Resources</button>
      <button className="navBut">Pricing</button>

      <a href="/login"><button style={{padding:'10px'}} className="navBut">Login</button></a>
      <a href="/sign"><button id="sign">Sign in</button></a>
    </div>
  </div>
  );
}
