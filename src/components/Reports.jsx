import React, { useEffect, useState } from "react";
import man from "../assets/man.svg";
import logo from "../assets/logo.png";
export const Reports = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [marginIndex, setMarginIndex] = useState(0);
  const [finalIndex, setFinalIndex] = useState(0);
  const [arrowMargin, setArrowMargin] = useState({});
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
        setMarginIndex(res.user[0].percentile);
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

  const getImageData = () => {
    const index = Math.floor(marginIndex / 10);
    setFinalIndex(index);
    const margin = {
      marginTop: "5px",
      marginLeft: "9px",
    };
    setArrowMargin(margin);
  };

  window.setTimeout(() => {
    localStorage.setItem("email", email);
    window.history.replaceState({}, null, "/");
  }, 2000);

  useEffect(() => {
    getReportsData();
    getImageData();
  }, [marginIndex]);

  if (loading) {
    return (
      <div className="container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
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
        {data && data.length > 0
          ? data.map(({ name }, index) => {
              return <h3 key={index}>{name}</h3>;
            })
          : null}
      </div>
      <div className="headerLine"></div>
      {data && data.length > 0 ? (
        data.map(({ correct, percent, percentile, polled }, index) => {
          return (
            <div key={index}>
              <section className="section1">
                <div className="percentile">
                  You are in the{" "}
                  <span>
                    {percentile}
                    <small>th</small>
                  </span>{" "}
                  percentile
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
              </section>
              <section className="section2">
                <div>
                  <p>Your Total Score</p>
                  <div className="totalAttempted">
                    <strong>{correct}</strong> <span>|</span>{" "}
                    <strong>{polled}</strong>
                  </div>
                </div>
                <div>
                  <p>Percentage Score</p>
                  <div className="totalAttempted totalAttemptedPercentage">
                    <strong>{percent}</strong>
                    <small>%</small>
                  </div>
                </div>
              </section>
              <section className="section3">
                <div className="nationalRank">
                  <strong>National Rank : </strong>
                  {"  "}
                  <small>NA</small>
                  <p>National Rank is only avialable for premiuim users</p>
                </div>
              </section>
              <footer className="footer">
                <div>
                  Facing issues ?{" "}
                  <span>
                    <a href="https://api.whatsapp.com/send/?phone=919717094422&text=Hello+I+would+like+more+information">
                      Message US
                    </a>
                  </span>
                </div>
              </footer>
              {/* <h1>Total Attempted : {attempted}</h1>
                <h1>Grade : {grade}</h1>
                <h1>Precentage : {percent}%</h1> */}
            </div>
          );
        })
      ) : (
        <h1>User not found</h1>
      )}
    </div>
  );
};
