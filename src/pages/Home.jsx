import Layout from "../components/NavigationBar";
import { UserContext } from "../context/useContext";
import React, { useContext } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// import Journey from "../components/Journey";
// import BGTJ from "../assets/images/BGTJ.png";

function Home() {
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;
  const navigate = useNavigate();

  let { data: checklists, refetch } = useQuery("checklistsCache", async () => {
    const response = await API.get("/checklist");
    // console.log("response checklists", response);
    const resultResponse = response.data.data;
    console.log("resultResponse", resultResponse);
    return response.data.data;
  });

  const handleDelete = async (e, checklistId) => {
    e.preventDefault();
    try {
      // console.log("ini kita mau bookmark :", state.user.id);

      // Configuration Content-type
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      // const
      // console.log("data mauc checj", jurneyId, state.user.id);

      const response = await API.delete(`/checklist/${checklistId}`, config);
      console.log(response);
      refetch();
      // navigate("/");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout />
      {isLogin ? (
        <>
          <div className="w-100">
            <h1 className="text-center rounded rounded-2 border border-3 border-info w-25 mx-auto mt-4 py-2 shadow">
              Todo List
            </h1>
          </div>
          <div>
            <Row md={4}>
              {checklists.map((checklist, index) => {
                return (
                  <Col className="d-flex justify-content-center" key={index}>
                    <Card
                      // as={Link}
                      // to="/detailchecklist"
                      className="text-center m-2 w-100"
                    >
                      {/* <Link
                        to="/detail"
                        className="text-decoration-none text-dark"
                      > */}
                      <Card.Body>
                        <Card.Title>{checklist.name}</Card.Title>
                      </Card.Body>
                      <div className="w-100 p-2">
                        <Button
                          onClick={(e) => {
                            // setSelectedJourneyId(jurney.id);
                            Swal.fire({
                              title: "Do you want to delete this Journey?",
                              showDenyButton: true,
                              confirmButtonText: "Delete",
                              denyButtonText: `Don't delete`,
                            }).then((result) => {
                              /* Read more about isConfirmed, isDenied below */
                              if (result.isConfirmed) {
                                Swal.fire({
                                  icon: "success",
                                  title: "Success!",
                                  showConfirmButton: true,
                                  onClick: handleDelete(e, checklist.id),
                                });
                              } else if (result.isDenied) {
                                Swal.fire(
                                  "The journey is not deleted",
                                  "",
                                  "info"
                                );
                              }
                            });
                          }}
                          className="w-50 fw-bold"
                          variant="danger"
                        >
                          delete
                        </Button>
                      </div>
                      {/* </Link> */}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      ) : (
        <div className="w-100">
          <Card className="w-50 mx-auto" style={{ marginTop: "200px" }}>
            <h2 className="text-center m-3">
              You Must Login to see the{" "}
              <span className="text-info border border-2 lh-lg border-dark rounded rounded-3 px-3 mt-3">
                Checklists
              </span>
            </h2>
          </Card>
        </div>
      )}

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
