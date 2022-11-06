import Layout from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function NewJourney() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });

  //ini handle input
  const handleChange = (event) => {
    // console.log("Name: ", event.target.name);
    // console.log("Value: ", event.target.value);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  // console.log("form --->", form);

  const handleSubmit = useMutation(async (event) => {
    try {
      event.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      console.log("name:", form);

      const response = await API.post("/checklist", form, config);
      console.log("IKI RESEKPON 2", response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");

      // Handling response here
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create new Checklist!",
      });
      console.log(error);
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        title: "Heyyoo!",
        text: "You have to login first~",
      });

      navigate("/");
    }
  }, []);

  return (
    <>
      <Layout />
      <div className="d-flex w-100 mt-5">
        <div className="title-NJ mx-auto">
          <h1 className="fw-bold text-start">Create New Checklist</h1>
        </div>
      </div>
      <div className="w-100 d-flex mb-5">
        <Form
          onSubmit={(event) => handleSubmit.mutate(event)}
          className="form_NJ mx-auto mt-3"
        >
          <div className="d-flex">
            <div className="w-75">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">List</Form.Label>
                <Form.Control
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder=""
                  className="shadow border-info border-opacity-50"
                />
              </Form.Group>
            </div>
          </div>
          <div className="w-100 d-flex">
            <Button
              className="m-auto mt-4 btn_post fw-semibold shadow"
              type="submit"
            >
              Post
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
