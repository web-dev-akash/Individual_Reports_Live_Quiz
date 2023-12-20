import {
  FREQUENCY,
  GET_DATA,
  GET_ERROR,
  GET_LOADING,
  GET_PREVIOUS_DATA,
  LAST_ACCESS,
  RANK,
} from "./actionTypes";
import axios from "axios";

const watiToken = process.env.REACT_APP_WATI_TOKEN;
const watiAPI = process.env.REACT_APP_WATI_API;

export const getData = (data) => ({
  type: GET_DATA,
  payload: data,
});

export const getLoading = () => ({
  type: GET_LOADING,
});

export const getError = () => ({
  type: GET_ERROR,
});

export const setFrequency = (data) => ({
  type: FREQUENCY,
  payload: data,
});

export const setRank = (data) => ({
  type: RANK,
  payload: data,
});

export const getPreviousData = (data) => ({
  type: GET_PREVIOUS_DATA,
  payload: data,
});

export const getLastAccess = (data) => ({
  type: LAST_ACCESS,
  payload: data,
});

export const setUserData =
  ({ dispatch }) =>
  async (email) => {
    try {
      dispatch(getLoading);
      const res = await fetch(
        `https://wisechamps.onrender.com/reports?email=${email}`
      );
      if (res.status === 200) {
        const res2 = await res.json();
        dispatch(setRank(res2.user[0].rank));
        dispatch(getData(res2.data));
        console.log(res2.user);
        return;
      } else {
        setRank("NA");
        const body = JSON.stringify([
          {
            name: "parent_email",
            operator: "contain",
            value: email,
          },
        ]);
        const response = await fetch(
          `${watiAPI}/api/v1/getContacts?attribute=${body}`,
          {
            method: "GET",
            headers: {
              Authorization: watiToken,
            },
          }
        );
        if (response.status === 200) {
          const response2 = await response.json();
          console.log(response2);
          let name = response2.contact_list[0].fullName;
          let getGrade = response2.contact_list[0].customParams.filter(
            (param) => param.name === "student_grade"
          );
          let grade = getGrade[0].value;
          // for (let i = 0; i < getGrade.length; i++)
          dispatch(
            getData([
              {
                name,
                grade,
                attempted: 0,
                correct: 0,
                percent: 0,
                polled: 0,
              },
            ])
          );
          return;
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(getError);
      return;
    }
  };
