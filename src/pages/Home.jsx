import Layout from "../components/NavigationBar";
import { UserContext } from "../context/useContext";
import React, { useContext } from "react";
// import Journey from "../components/Journey";
// import BGTJ from "../assets/images/BGTJ.png";

function Home() {
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;

  return (
    <>
      <Layout />
      <h1>API Todo List BTS.id</h1>
      {/* {isLogin ? (
        ""
      ) : (
        <div className="BGHome">
          <div className="w-75" style={{ position: "absolute", top: "20%" }}>
            <h1 className="text-light title-home">The Journey</h1>
            <h1 className="text-light title-home">you ever dreamed of.</h1>
            <p className="text-light text-home fs-5">
              We made a tool so you can easily keep & share your travel memories
              <br />
              But there is a lot more
            </p>
            <p className="text-light text-home fs-5"></p>
          </div>

          <img className="BGTJ" alt="" />
        </div> */}
      {/* )} */}

      {/* searchbar */}

      {/* <Journey /> */}
    </>
  );
}

export default Home;
