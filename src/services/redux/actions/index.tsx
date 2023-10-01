// authActions.ts
import { AuthActionTypes, AuthAction, User } from "../types";

export const setAuthenticated = (): AuthAction => ({
  type: AuthActionTypes.SET_AUTHENTICATED,
});

export const setUnauthenticated = (): AuthAction => ({
  type: AuthActionTypes.SET_UNAUTHENTICATED,
});

export const setUser = (user: User): AuthAction => ({
  type: AuthActionTypes.SET_USER,
  payload: user,
});
