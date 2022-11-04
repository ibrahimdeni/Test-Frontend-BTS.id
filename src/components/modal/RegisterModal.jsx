import { Alert, Button, Form, Modal } from "react-bootstrap";
import Leaf from "../../assets/icons/LEAF.png";
import Map from "../../assets/icons/map.png";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

function Example({ handleCloseR, registerShow }) {
  // const switchLogin = () => {
  //   setShow(true);
  //   setShowR(false);
  // };

  const [messages, setMessages] = useState(null);

  //register
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(register);
      console.log(body);
      await API.post("/register", body, config);

      Swal.fire({
        icon: "success",
        title: "Registration Success!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration Failed!",
      });
      console.log(error);
    }
  });
  return (
    <>
      <Modal
        className="modalregister"
        style={{ height: "700px" }}
        position="absolute"
        show={registerShow}
        onHide={handleCloseR}
      >
        <img
          src={Map}
          className="rounded-3"
          style={{
            width: "50px",
            position: "fixed",
            left: "36.3%",
            marginTop: "0px",
          }}
          alt=""
        />
        <img
          src={Leaf}
          alt=""
          className="rounded-2"
          style={{
            position: "fixed",
            width: "90px",
            // top: "auto",
            left: "58.33%",
            objectFit: "cover",
          }}
        />
        <div className="mx-5">
          <div className="my-2">
            <h2 className="text-center fw-bold">Register </h2>
          </div>
          <div style={{ marginBottom: "10%" }}>
            <Form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
              {/* {messages && messages} */}
              <Form.Group className="">
                <Form.Label className="fw-bold fs-5">Username</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  placeholder=""
                  onChange={handleChangeRegister}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="">
                <Form.Label className="fw-bold fs-5">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  onChange={handleChangeRegister}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="">
                <Form.Label className="fw-bold fs-5">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  placeholder=""
                  onChange={handleChangeRegister}
                  autoFocus
                />
              </Form.Group>
              <div className="mb-4 mt-2">
                <Button
                  variant="primary w-100 fw-semibold fs-4"
                  onClick={handleCloseR}
                  type="submit"
                >
                  Register
                </Button>
                {/* <p>
                  Already Have an Account? Klik{" "}
                  <strong style={{ cursor: "pointer" }} onClick={switchLogin}>
                    Here
                  </strong>
                </p> */}
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Example;
