const initialState: Payload = {
  isAuth: false,
  user: "",
};

type Payload = {
  isAuth: boolean;
  user: string;
};

type Action = {
  type: string;
  payload: Payload;
};

const SET_AUTH = "SET_AUTH";

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_AUTH:
      return { isAuth: action.payload.isAuth, user: action.payload.user };
    default:
      return state;
  }
};

export const setAuthAction = (payload: Payload) => ({
  type: SET_AUTH,
  payload,
});
