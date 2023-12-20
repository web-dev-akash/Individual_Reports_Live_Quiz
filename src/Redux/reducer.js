import {
  FREQUENCY,
  GET_DATA,
  GET_ERROR,
  GET_LOADING,
  GET_PREVIOUS_DATA,
  LAST_ACCESS,
  RANK,
} from "./actionTypes";

const initState = {
  loading: true,
  error: false,
  user: [],
  previousData: [],
  lastAccess: "",
  rank: "NA",
  frequency: 0,
};
export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case GET_DATA: {
      return {
        ...state,
        loading: false,
        error: false,
        user: payload,
      };
    }
    case FREQUENCY: {
      return {
        ...state,
        frequency: payload,
      };
    }
    case GET_PREVIOUS_DATA: {
      return {
        ...state,
        previousData: payload,
      };
    }
    case LAST_ACCESS: {
      return {
        ...state,
        lastAccess: payload,
      };
    }
    case RANK: {
      return {
        ...state,
        rank: payload,
      };
    }
    default: {
      return state;
    }
  }
};
