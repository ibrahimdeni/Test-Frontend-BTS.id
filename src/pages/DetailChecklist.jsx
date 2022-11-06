import Layout from "../components/NavigationBar";
import { UserContext } from "../context/useContext";
import React, { useContext } from "react";

function DetailChecklist() {
  const [state] = useContext(UserContext);
  //   const isLogin = state.isLogin;

  return (
    <>
      <div>
        <Layout />
        <h1>hello</h1>
      </div>
    </>
  );
}
export default DetailChecklist();
