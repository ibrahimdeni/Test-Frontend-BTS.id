import { Button, Container, Navbar } from "react-bootstrap";
import { useState } from "react";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import { UserContext } from "../context/useContext";
import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import userPhoto from "../assets/icons/userddnew.png";
import daundd from "../assets/icons/daundd.png";
import logoutdd from "../assets/icons/logoutdd.png";
import Swal from "sweetalert2";

function NavBar() {
  const [state, dispatch] = useContext(UserContext);
  const isLogin = state.isLogin;
  let navigate = useNavigate();

  // console.log("ini state user", state);
  // console.log("state Login", isLogin);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShowR(false);
  };
  // console.log("showwww", show);

  const [registerShow, setShowR] = useState(false);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => {
    setShowR(true);
    setShow(false);
  };
  // console.log("rshow", registerShow);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      icon: "success",
      title: "Logout Success!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <Navbar
      className={isLogin ? "sticky-top w-100 shadow" : "sticky-top w-100 "}
      bg={isLogin ? "light" : "transparent"}
      expand="lg"
    >
      <Container fluid>
        <div className="icon">
          <h1>Test Todo List BTS.id</h1>
        </div>
        <div className="ms-auto">
          {isLogin ? (
            <Dropdown style={{ marginRight: "70px" }}>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img src={userPhoto} width={40} alt="user" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="fw-bold" variant="light">
                <Dropdown.Item
                  className="fw-semibold"
                  as={Link}
                  to="/newchecklist"
                >
                  <img
                    src={daundd}
                    style={{ width: "20px", marginRight: "10px" }}
                    alt=""
                  />
                  New Checklist
                </Dropdown.Item>
                <Dropdown.Divider className="bg-light dropDivid" />
                <Dropdown.Item
                  className="fw-semibold"
                  href="#"
                  onClick={logout}
                >
                  <img
                    src={logoutdd}
                    style={{ width: "20px", marginRight: "10px" }}
                    alt=""
                  />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Navbar.Collapse id="navbarScroll" className="w-100">
              <div className="w-50">
                <Button
                  className="text-dark fw-semibold me-2 w-100 px-4"
                  variant="outline-light"
                  onClick={handleShow}
                >
                  Login
                </Button>
                <LoginModal handleClose={handleClose} show={show} />
              </div>
              <div className="w-50">
                <Button
                  className="btn-primary fw-semibold text-light ms-2 w-100  px-4"
                  variant="outline-primary"
                  onClick={handleShowR}
                >
                  Register
                </Button>
                <RegisterModal
                  handleCloseR={handleCloseR}
                  registerShow={registerShow}
                />
              </div>
            </Navbar.Collapse>
          )}
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
