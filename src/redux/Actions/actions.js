import {SET_NUMBER_QUESTION, SET_SCORES, MAX_SCORES, GET_QUESTIONS, CLEAR_STORE} from '../Constants/constants'

export const getQuestionsAC = (payload) => {
  return {type: GET_QUESTIONS, payload}
}
export const currentQuestionsAC = (payload) => {
  return {type: SET_NUMBER_QUESTION, payload}
}
export const maxScoresAC = (payload) => {
  return {type: MAX_SCORES, payload}
}
export const countScoresAC = (payload) => {
  return {type: SET_SCORES, payload}
}
export const clearStoreAc = () => {
  return {type: CLEAR_STORE}
}
