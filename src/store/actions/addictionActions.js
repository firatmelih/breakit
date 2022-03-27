import { ADD_ADDICTION, LOAD_ADDICTIONS } from '../types'

export function addAddiction (addiction) {
  return {
    type: ADD_ADDICTION,
    payload: addiction
  }
}

export function loadAddictions (value) {
  return {
    type: LOAD_ADDICTIONS,
    payload: value
  }
}
