import { CHANGE_THEME, CHANGE_LANGUAGE } from '../types'

const INITIAL_STATE = {
  theme: 'dark',
  loading: false,
  language:'en'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      }
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }
    default:
      return state
  }
}
