import {
  createContext,
  useContext,
  useReducer,
} from 'react'
import { mainReducer } from './reducers'

const StateContext = createContext()

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStore = () => useContext(StateContext)

const Store = ({ children }) => {
  const initialState = {
    data: {},
    filters: {},
  }
  
  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      {children}
    </StateProvider>
  )
}

export default Store
