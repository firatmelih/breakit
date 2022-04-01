import { ADD_ADDICTION, LOAD_ADDICTIONS, REMOVE_ADDICTION, LOAD_NUMBER_ADDICTIONS } from '../types'

const INITIAL_STATE = {
  addictions: [],
  allAddictions: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ADDICTION:
      return {
        ...state,
        addictions: [...state.addictions, action.payload],
      }

    case LOAD_ADDICTIONS:
      return {
        ...state,
        addictions: action.payload
      }

    case REMOVE_ADDICTION:
      return {
        ...state,
        addictions: action.payload
      }
    default:
      return state
  }
}
