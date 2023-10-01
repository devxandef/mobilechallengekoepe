// authReducer.ts
import { AuthActionTypes, AuthAction, AuthState, User } from "../types";

const defaultUser: User = {
  id: "",
  displayName: "",
  email: "",
  wordData: [],
  favoritesData: [],
  historyData: [],
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: defaultUser,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AuthActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
