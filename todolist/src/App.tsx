
import { isMobile } from "react-device-detect";
import { useEffect,useState } from "react";
import Mobilenav from "./Components/mobilenav.tsx";
import Navbar from "./Components/navbar.tsx";
function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function App() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  let is_mobile = isMobile;
  console.log(screenSize)
  if (screenSize.width <= 1025) is_mobile = true;
  console.log(is_mobile)
  return (
    <>
      {is_mobile ? <Mobilenav /> : <Navbar />}
      {/* <div className="navbar">
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
      </div> */}

      <div className="main-titr">
        <div className="titr">Organize your work and life, finally.</div>
        <p className="subtitr">
          Become focused, organized, and calm with Todoer. The world’s #1 task
          manager and to-do list app.
        </p>
      </div>
    </>
  );
}

export default App;
