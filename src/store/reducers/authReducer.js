const initialState = {
  authenticated: false,
  keycloak: null,
  realm: null
}

export const authenticate = 'authenticate'

export function authReducer(state=initialState, action) {
  switch (action.type) {
    case authenticate:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        keycloak: action.payload.keycloak,
      };
    case 'realm': 
      return {
        ...state,
        realm: action.payload.realm
      };
    default:
      return state;
  }
}