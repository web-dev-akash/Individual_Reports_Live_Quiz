import React, { useEffect, useState } from "react";
import man from "../assets/man.svg";
import logo from "../assets/logo.png";
import rank from "../assets/top10.png";
import whatsapp from "../assets/whatsapp.webp";
import "../App.scss";
import {
  Tooltip,
  Grid,
  GridItem,
  Progress,
  List,
  ListItem,
  ListIcon,
  useToast,
  Box,
} from "@chakra-ui/react";
import { HiHandThumbUp } from "react-icons/hi2";
import { GiHiking } from "react-icons/gi";
export const English = () => {
  const toast = useToast();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [freeUser, setFreeUser] = useState(true);
  // const [marginIndex, setMarginIndex] = useState(0);
  // const [finalIndex, setFinalIndex] = useState(0);
  // const [percentage, setPercentage] = useState(false);
  // const [arrowMargin, setArrowMargin] = useState({});
  const queryParameters = new URLSearchParams(window.location.search);
  const queryEmail = queryParameters.get("email");
  const localEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(queryEmail ? queryEmail : localEmail);

  const getReportsData = async () => {
    if (
      !email ||
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setLoading(false);
      setError(true);
      return;
    }
    setLoading(true);
    fetch(`https://wisechamps.onrender.com/reports?email=${email}`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setData(res.user);
        // setMarginIndex(res.user[0].percentile);
        res.user[0].percentile > 70 &&
          !freeUser &&
          toast({
            position: "bottom",
            duration: 5000,
            render: () => (
              <Box
                className="congratulations-toast"
                color="white"
                p={3}
                bg="blue.500"
              >
                <div className="toast-content">
                  <h1 className="message">Congratulations, Akash!</h1>
                  <p className="description">
                    You have achieved a remarkable feat by securing a spot in
                    the top 10.
                  </p>
                </div>
              </Box>
            ),
          });
        return;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        return;
      });
  };
  // console.log(data);

  // const getImageData = () => {
  //   const index = Math.floor(marginIndex / 10);
  //   setFinalIndex(index);
  //   const margin = {
  //     marginTop: "5px",
  //     marginLeft: "9px",
  //   };
  //   setArrowMargin(margin);
  // };

  window.setTimeout(() => {
    localStorage.setItem("email", email);
    window.history.replaceState({}, null, "/");
  }, 2000);

  useEffect(() => {
    if (!freeUser) {
      getReportsData();
    }
  }, []);

  if (loading) {
    return (
      <section className="loadingSection">
        <div className="loadingContainer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="errorDiv">
        <div className="mars"></div>
        <img
          src="https://assets.codepen.io/1538474/404.svg"
          className="logo-404"
          alt="logo"
        />
        <img
          src="https://assets.codepen.io/1538474/meteor.svg"
          className="meteor"
          alt="meteor"
        />
        <p className="title">Oh No!!</p>
        <p className="subtitle">
          You're either misspelling the URL <br /> or the Email you provided is
          invalid.
        </p>
        <div align="center">
          <p className="subtitle">Try Refreshing the page once.</p>
        </div>
        <img
          src="https://assets.codepen.io/1538474/astronaut.svg"
          className="astronaut"
          alt="astronaut"
        />
        <img
          src="https://assets.codepen.io/1538474/spaceship.svg"
          className="spaceship"
          alt="spaceship"
        />
      </div>
    );
  }

  if (freeUser) {
    return (
      <div
        style={{
          textAlign: "center",
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1
          style={{
            fontSize: "25px",
            fontWeight: "600",
          }}
        >
          Not Available
        </h1>
      </div>
    );
  }

  return (
    <div className="reportData">
      <div className="headerLogo">
        <img src={logo} alt="logo" />
        <div>
          <img src={rank} alt="top-10" />
        </div>
        <div>
          {data && data.length > 0
            ? data.map(({ name, grade }, index) => {
                return (
                  <div
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    <h3 key={index}>{name}</h3>
                    <p
                      style={{
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      (Grade : {grade})
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="headerLine"></div>
      {data && data.length > 0 ? (
        data.map(({ correct, percent, percentile, polled }, index) => {
          return (
            <div key={index}>
              {/* <section className="section1">
                <div className="percentile">
                  <strong>PERCENTILE :</strong>{" "}
                  <span>
                    {percentile}
                    <small>th</small>
                  </span>{" "}
                  <Tooltip
                    label="Your Performace Increased from the previous one"
                    aria-label="A tooltip"
                  >
                    <span class="material-symbols-outlined">trending_up</span>
                  </Tooltip>
                </div>

                <div className="manDiv">
                  {[...Array(10)].map((res, index) => (
                    <div key={index}>
                      {" "}
                      <img
                        src={man}
                        className={
                          index < finalIndex ? "completed" : "notCompleted"
                        }
                        alt="logo"
                      />
                      <div
                        className={
                          index + 1 === finalIndex
                            ? "arrowUp visible"
                            : "arrowUp"
                        }
                        style={arrowMargin}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="progressBar"></div>
                <div>
                  <p className="progressStatement">
                    You scored equal to or higher than{" "}
                    <span>{percentile}%</span> of the students
                  </p>
                </div>
              </section> */}

              <section
                className="completionProgressBar"
                style={{
                  marginBottom: "30px",
                }}
              >
                <h1
                  style={{
                    margin: "20px 0 15px 0",
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "600",
                  }}
                >
                  Progress Report
                </h1>
                <div>
                  {/* <strong
                    style={{
                      fontSize: "25px",
                      fontWeight: "600",
                    }}
                  >
                    Progress :{" "}
                  </strong> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "-10px",
                      color: "#0799D8",
                      fontWeight: "700",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Start
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Finish
                    </p>
                  </div>
                  <Progress
                    max={1000}
                    mt={4}
                    borderRadius={"10px"}
                    isAnimated
                    hasStripe
                    value={900}
                    colorScheme="green"
                  />
                  <p className="progressStatement">
                    You have covered <span>90%</span> of the topics for the
                    Olympiad
                  </p>
                </div>
              </section>

              <section className="section2">
                <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                  <GridItem
                    style={{
                      // border: "1px solid",
                      padding: "20px 0 ",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div>
                      <div className="totalAttempted">
                        <strong>{180}</strong>
                        <span class="material-symbols-outlined">
                          trending_up
                        </span>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#000",
                            margin: "8px 0 10px 0",
                          }}
                        >
                          +10
                        </p>
                      </div>
                      <p>Total Correct</p>
                    </div>
                  </GridItem>
                  <GridItem
                    style={{
                      // border: "1px solid",
                      padding: "20px 0 ",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div>
                      <div className="totalAttempted">
                        <strong>{polled}</strong>
                        <span class="material-symbols-outlined">
                          trending_up
                        </span>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#000",
                            margin: "8px 0 10px 0",
                          }}
                        >
                          +20
                        </p>
                      </div>
                      <p>Total Attempted</p>
                    </div>
                  </GridItem>
                  <GridItem
                    style={{
                      padding: "20px 0 ",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div>
                      <div className="totalAttempted totalAttemptedPercentage">
                        <strong>{90}</strong>
                        {/* <small>%</small> */}
                        <span class="material-symbols-outlined">
                          trending_down
                        </span>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#000",
                            margin: "8px 0 10px 0",
                          }}
                        >
                          -3%
                        </p>
                      </div>
                      <p>Percentage Score</p>
                    </div>
                  </GridItem>
                  <GridItem
                    style={{
                      // border: "1px solid",
                      padding: "20px 0 ",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    <div>
                      <div className="totalAttempted totalAttemptedPercentage">
                        <strong
                          style={{
                            color: "green",
                          }}
                        >
                          {62}
                        </strong>
                        <span class="material-symbols-outlined">
                          trending_up
                        </span>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#000",
                            margin: "8px 0 10px 0",
                          }}
                        >
                          +5
                        </p>
                      </div>
                      <p>Frequency</p>
                    </div>
                  </GridItem>
                </Grid>
              </section>

              <section>
                <p className="progressStatement">
                  Change reported is as observed over the last <span>6</span>{" "}
                  days.{" "}
                </p>
              </section>
              {/* <section className="section3">
                <div className="nationalRank">
                  <strong>National Rank : </strong>
                  {"  "}
                  <small>NA*</small>
                  <p>*National Rank is only avialable for paid users</p>
                </div>
              </section> */}

              <section className="topics">
                <h1
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                >
                  Topic Insights
                </h1>
                <List spacing={4} className="topicsList">
                  <ListItem
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        as={HiHandThumbUp}
                        color="blue.500"
                        style={{
                          fontSize: "25px",
                        }}
                      />
                      <p>Math - Integers</p>
                    </div>
                    <p>95%</p>
                  </ListItem>
                  <ListItem
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        as={HiHandThumbUp}
                        color="blue.500"
                        style={{
                          fontSize: "25px",
                        }}
                      />
                      <p>English - Nouns</p>
                    </div>
                    <p>90%</p>
                  </ListItem>
                  <ListItem
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        as={HiHandThumbUp}
                        color="blue.500"
                        style={{
                          fontSize: "25px",
                        }}
                      />
                      <p>Science - Forces</p>
                    </div>
                    <p>97%</p>
                  </ListItem>
                  {/* You can also use custom icons from react-icons */}
                </List>
              </section>

              <section
                style={{
                  height: "2px",
                  margin: "20px 0",
                }}
              ></section>

              <section className="topics">
                <List spacing={4} className="topicsList">
                  <ListItem
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        as={GiHiking}
                        color="blue.500"
                        style={{
                          fontSize: "25px",
                        }}
                      />
                      <p>Math - Fractions</p>
                    </div>
                    <p>52%</p>
                  </ListItem>

                  <ListItem
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        as={GiHiking}
                        color="blue.500"
                        style={{
                          fontSize: "25px",
                        }}
                      />
                      <p>GK - Current Affairs</p>
                    </div>
                    <p>50%</p>
                  </ListItem>
                  <ListItem
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        as={GiHiking}
                        color="blue.500"
                        style={{
                          fontSize: "25px",
                        }}
                      />
                      <p>English - Punctuations</p>
                    </div>
                    <p>47%</p>
                  </ListItem>
                </List>
              </section>

              <footer
                className="footer"
                style={{
                  position: "fixed",
                  bottom: "70px",
                  right: "20px",
                }}
              >
                <div className="helpSection">
                  <a
                    href="https://wa.me/919717094422?text=Hi%20WiseChamps%2C%0AI%20need%20help%20regarding%20Live%20Quiz%20Reports"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      <img src={whatsapp} alt="whatsapp-logo" width={"45px"} />
                    </span>
                  </a>
                </div>
              </footer>
            </div>
          );
        })
      ) : (
        <h1>User not found</h1>
      )}
    </div>
  );
};
