export interface User {
  id: string;
  displayName: string;
  email: string;
  wordData: string[];
  favoritesData: string[];
  historyData: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export enum AuthActionTypes {
  SET_AUTHENTICATED = "SET_AUTHENTICATED",
  SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED",
  SET_USER = "SET_USER",
}

interface SetAuthenticatedAction {
  type: AuthActionTypes.SET_AUTHENTICATED;
}

interface SetUnauthenticatedAction {
  type: AuthActionTypes.SET_UNAUTHENTICATED;
}

interface SetUserAction {
  type: AuthActionTypes.SET_USER;
  payload: User;
}

export type AuthAction =
  | SetAuthenticatedAction
  | SetUnauthenticatedAction
  | SetUserAction;
