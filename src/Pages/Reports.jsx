import React, { useEffect, useState } from "react";
import man from "../assets/man.svg";
import logo from "../assets/logo.png";
import rankImg from "../assets/top10.png";
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
  Text,
  Icon,
} from "@chakra-ui/react";
import { HiHandThumbUp } from "react-icons/hi2";
import { GiHiking } from "react-icons/gi";
import { BsFillInfoCircleFill } from "react-icons/bs";
export const Reports = () => {
  const toast = useToast();
  const [data, setData] = useState({});
  const [previousData, setPreviuosData] = useState({});
  const [lastAccess, setLastAccess] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [rank, setRank] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [label, setLabel] = useState("");
  const watiToken = process.env.REACT_APP_WATI_TOKEN;
  const watiAPI = process.env.REACT_APP_WATI_API;
  // const [marginIndex, setMarginIndex] = useState(0);
  // const [finalIndex, setFinalIndex] = useState(0);
  // const [percentage, setPercentage] = useState(false);
  // const [arrowMargin, setArrowMargin] = useState({});
  const queryParameters = new URLSearchParams(window.location.search);
  const queryEmail = queryParameters.get("email");
  const localEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(queryEmail ? queryEmail : localEmail);

  const getReportsData = async () => {
    try {
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
      if (email === "samplestudent@wisechamps.com") {
        setRank(1);
        const sampleObj = [
          {
            correct: 850,
            percent: 85,
            polled: 900,
            attempted: 880,
          },
        ];
        setData(sampleObj);
        return;
      }
      setLoading(true);
      const res = await fetch(
        `https://services.wisechamps.com/reports?email=${email}`
      );

      const res2 = await res.json();
      setData(res2.user);
      setRank(res2.user[0].rank);
      res2.user[0].rank <= 10 &&
        toast({
          position: "top",
          colorScheme: "whatsapp",
          duration: 3000,
          isClosable: true,
          title: (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h1 style={{ fontSize: "25px" }}>Congratulations!</h1>
              <h3
                style={{
                  textAlign: "center",
                }}
              >
                {res2.user[0].name}
              </h3>
            </div>
          ),
          description: (
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              You have achieved a remarkable feat by securing a spot in the top
              10.
            </p>
          ),
        });
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      return;
    }
  };

  const getPreviousData = async () => {
    try {
      if (email === "samplestudent@wisechamps.com") {
        setFrequency(50);
        const previousCorrect = 820;
        const previousPolled = 880;
        const previousPercent = 83;
        setPreviuosData({
          previousPolled,
          previousCorrect,
          previousPercent,
        });
        setLastAccess(0);
        return;
      }
      const today = new Date();
      const res = await fetch(
        `https://services.wisechamps.com/previousReport?email=${email}`
      );
      const res2 = await res.json();
      const response = res2.data;
      if (res && res2 && response.length > 0) {
        const value = res2.data[0].date.split("/");
        const date = new Date(value[2], value[1], value[0]);
        let totalDays = today.getDate() - date.getDate();
        setFrequency(totalDays);
        const previousCorrect = response[response.length - 1].totalCorrect;
        const previousPolled = response[response.length - 1].totalPolled;
        const previousPercent = response[response.length - 1].totalPercent;
        console.log(previousCorrect);
        setPreviuosData({
          previousPolled,
          previousCorrect,
          previousPercent,
        });
        const lastValue = response[response.length - 1].date.split("/");
        const lastDate = new Date(lastValue[2], lastValue[1], lastValue[0]);
        const lastAccess = today.getDate() - lastDate.getDate();
        setLastAccess(lastAccess);
      } else {
        setFrequency(0);
        const previousCorrect = 0;
        const previousPolled = 0;
        const previousPercent = 0;
        setPreviuosData({
          previousPolled,
          previousCorrect,
          previousPercent,
        });
        setLastAccess(0);
      }
      const string = `Total Numbers of questions attempted ${(
        <br />
      )} total number of days`;
      setLabel(string);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
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
    getReportsData();
    // getImageData();
    getPreviousData();
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

  return (
    <div className="reportData">
      <div className="headerLogo">
        <img src={logo} alt="logo" />
        {rank <= 10 && (
          <div>
            <img src={rankImg} alt="top-10" />
          </div>
        )}
        <div>
          {data && data.length > 0
            ? data.map(({ name, grade }, index) => {
                return (
                  <div
                    key={index}
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
        data.map(
          ({ correct, percent, percentile, attempted, polled }, index) => {
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
                  <Text
                    fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                    fontWeight={{ base: "600", md: "700", lg: "800" }}
                    style={{
                      margin: "20px 0 15px 0",
                      textAlign: "center",
                    }}
                  >
                    Progress Report
                  </Text>
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
                      <p fontSize={{ base: "12px", md: "20px", lg: "25px" }}>
                        Start
                      </p>
                      <p fontSize={{ base: "12px", md: "20px", lg: "25px" }}>
                        Finish
                      </p>
                    </div>
                    <Progress
                      height={{ base: "10px", md: "30px", lg: "30px" }}
                      max={1000}
                      mt={4}
                      borderRadius={"10px"}
                      isAnimated
                      hasStripe
                      value={attempted}
                      colorScheme="whatsapp"
                    />
                    <p className="progressStatement">
                      You have covered <span>{attempted / 10}%</span> of the
                      topics for the Olympiad
                    </p>
                  </div>
                </section>

                <section className="section2">
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={{ base: 2, sm: 2, md: 5, lg: 10 }}
                  >
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
                          <strong>{correct}</strong>
                          <span class="material-symbols-outlined">
                            trending_up
                          </span>
                          <p
                            fontSize={{ base: "12px", md: "20px", lg: "25px" }}
                            style={{
                              color: "#000",
                              margin: "8px 0 10px 0",
                            }}
                          >
                            {correct - previousData.previousCorrect >= 0
                              ? previousData.previousCorrect === 0
                                ? "+0"
                                : `+${correct - previousData.previousCorrect}`
                              : `-${previousData.previousCorrect - correct}`}
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
                            fontSize={{ base: "12px", md: "20px", lg: "25px" }}
                            style={{
                              color: "#000",
                              margin: "8px 0 10px 0",
                            }}
                          >
                            {polled - previousData.previousPolled >= 0
                              ? previousData.previousPolled === 0
                                ? "+0"
                                : `+${polled - previousData.previousPolled}`
                              : `-${previousData.previousPolled - polled}`}
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
                          <strong>{percent}</strong>
                          {/* <small>%</small> */}
                          {percent - previousData.previousPercent >= 0 ? (
                            <span class="material-symbols-outlined">
                              trending_up
                            </span>
                          ) : (
                            <span class="material-symbols-outlined">
                              trending_down
                            </span>
                          )}
                          <p
                            fontSize={{ base: "12px", md: "20px", lg: "25px" }}
                            style={{
                              color: "#000",
                              margin: "8px 0 10px 0",
                            }}
                          >
                            {percent - previousData.previousPercent >= 0
                              ? previousData.previousPercent === 0
                                ? "+0%"
                                : `+${percent - previousData.previousPercent}%`
                              : `-${previousData.previousPercent - percent}%`}
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
                        position: "relative",
                      }}
                    >
                      <Tooltip
                        className="tooltip"
                        shouldWrapChildren
                        closeOnClick
                        bg="gray.300"
                        color="black"
                        label={
                          <div style={{ textAlign: "center" }}>
                            Total Numbers of questions attempted
                            <br />
                            <hr
                              style={{ margin: "10px 0", background: "white" }}
                            />
                            <p>Total number of days</p>
                          </div>
                        }
                      >
                        <Icon
                          as={BsFillInfoCircleFill}
                          style={{
                            color: "#0799D8",
                            fontSize: "18px",
                          }}
                        />
                      </Tooltip>
                      <div>
                        <div className="totalAttempted totalAttemptedPercentage">
                          <Text as={"strong"} color="green.400">
                            {frequency !== 0
                              ? Math.floor(correct / frequency)
                              : correct}
                          </Text>
                          {/* <span class="material-symbols-outlined">
                            trending_up
                          </span>
                          <p
                            fontSize={{ base: "12px", md: "20px", lg: "25px" }}
                            style={{
                              color: "#000",
                              margin: "8px 0 10px 0",
                            }}
                          >
                            +5
                          </p> */}
                        </div>
                        <p>Frequency</p>
                      </div>
                    </GridItem>
                  </Grid>
                </section>

                <section>
                  <p className="progressStatement">
                    Change reported is as observed over the last{" "}
                    <span>{lastAccess}</span> days.{" "}
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
                  <Text
                    fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                    fontWeight={{ base: "600", md: "700", lg: "800" }}
                    style={{
                      margin: "20px 0",
                      textAlign: "center",
                    }}
                  >
                    Topic Insights
                  </Text>
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
                          fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                          as={HiHandThumbUp}
                          color="blue.500"
                        />
                        <Text
                          fontSize={{ base: "13px", md: "20px", lg: "30px" }}
                        >
                          Math - Integers
                        </Text>
                      </div>
                      <Text fontSize={{ base: "13px", md: "20px", lg: "30px" }}>
                        95%
                      </Text>
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
                          fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                          as={HiHandThumbUp}
                          color="blue.500"
                        />
                        <Text
                          fontSize={{ base: "13px", md: "20px", lg: "30px" }}
                        >
                          English - Nouns
                        </Text>
                      </div>
                      <Text fontSize={{ base: "13px", md: "20px", lg: "30px" }}>
                        90%
                      </Text>
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
                          fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                          as={HiHandThumbUp}
                          color="blue.500"
                        />
                        <Text
                          fontSize={{ base: "13px", md: "20px", lg: "30px" }}
                        >
                          Science - Forces
                        </Text>
                      </div>
                      <Text fontSize={{ base: "13px", md: "20px", lg: "30px" }}>
                        97%
                      </Text>
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
                          fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                          as={GiHiking}
                          color="blue.500"
                        />
                        <Text
                          fontSize={{ base: "13px", md: "20px", lg: "30px" }}
                        >
                          Math - Fractions
                        </Text>
                      </div>
                      <Text fontSize={{ base: "13px", md: "20px", lg: "30px" }}>
                        52%
                      </Text>
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
                          fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                          as={GiHiking}
                          color="blue.500"
                        />
                        <Text
                          fontSize={{ base: "13px", md: "20px", lg: "30px" }}
                        >
                          GK - Current Affairs
                        </Text>
                      </div>
                      <Text fontSize={{ base: "13px", md: "20px", lg: "30px" }}>
                        50%
                      </Text>
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
                          fontSize={{ base: "25px", md: "40px", lg: "50px" }}
                          as={GiHiking}
                          color="blue.500"
                        />
                        <Text
                          fontSize={{ base: "13px", md: "20px", lg: "30px" }}
                        >
                          English - Punctuations
                        </Text>
                      </div>
                      <Text fontSize={{ base: "13px", md: "20px", lg: "30px" }}>
                        47%
                      </Text>
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
                        <img
                          src={whatsapp}
                          alt="whatsapp-logo"
                          width={"45px"}
                        />
                      </span>
                    </a>
                  </div>
                </footer>
              </div>
            );
          }
        )
      ) : (
        <h1>User not found</h1>
      )}
    </div>
  );
};
