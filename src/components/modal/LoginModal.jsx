import { Alert, Button, Form, Modal } from "react-bootstrap";
import Leaf from "../../assets/icons/LEAF.png";
import Map from "../../assets/icons/map.png";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/useContext";
import Swal from "sweetalert2";

function Example({ handleClose, show }) {
  // const switchRegister = () => {
  //   setShowR(true);
  //   setShow(false);
  // };

  const [state, dispatch] = useContext(UserContext);
  // const [message, setMessage] = useState(null);

  //login
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      console.log(body);
      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        if (response.data.data.role === "admin") {
          navigate("/transaction");
        } else {
          navigate("/");
        }
      }
      Swal.fire({
        icon: "success",
        title: "Login Success!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed!",
      });
      console.log(error);
    }
  });

  return (
    <>
      <Modal className="mt-3 modalregister" show={show} onHide={handleClose}>
        <img
          src={Map}
          className="rounded-3"
          style={{
            width: "50px",
            position: "fixed",
            left: "35.07%",
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
          <div className="my-5">
            <h2 className="text-center fw-bold">Login </h2>
          </div>
          <div style={{ marginBottom: "10%" }}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              {/* {message && message} */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Username</Form.Label>
                <Form.Control
                  type="username"
                  id="username"
                  name="username"
                  placeholder=""
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  placeholder=""
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <div className="mb-4">
                <Button
                  variant="primary w-100 fw-semibold fs-4"
                  onClick={handleClose}
                  type="submit"
                >
                  Login
                </Button>
                {/* <p>
                  Already Have an Account? Klik{" "}
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={switchRegister}
                  >
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
