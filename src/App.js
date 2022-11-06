import { Routes, Route, useNavigate } from "react-router-dom";
// import Layout from "./widget/layout";
import Home from "./pages/Home";
import NewChecklist from "./pages/NewChecklist";
// import Detail from "./pages/DetailChecklist";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/useContext";
import { API } from "./config/api";
import { setAuthToken } from "./config/api";

//init token on axios evry time the app refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log("ini state user", state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.post("/login");

      // If the token incorrect
      // if (response.status === 404) {
      //   return dispatch({
      //     type: "AUTH_ERROR",
      //   });
      // }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newchecklist" element={<NewChecklist />} />
        {/* <Route path="/detailchecklist" element={<Detail />} /> */}
      </Routes>
    </>
  );
}

export default App;
