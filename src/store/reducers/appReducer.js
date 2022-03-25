import { CHANGE_THEME } from '../types'

const INITIAL_STATE = {
  theme: 'dark',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      }

    default:
      return state
  }
}
