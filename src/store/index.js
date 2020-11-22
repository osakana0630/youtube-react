import React, {createContext, useReducer} from 'react';

const initialState = {
  popular: [],
  related: [],
  selected: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POPULAR":
      return {...state, popular: action.payload.popular}
    case "SET_SELECTED":
      return {...state, selected: action.payload.selected}
    case "SET_RELATED":
      return {...state, related: action.payload.related}
    default:
      return state;
  }
}

export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null,

})

export const StoreProvider = ({children}) => {

  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{globalState, setGlobalState}}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider;