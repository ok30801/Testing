import {SET_NUMBER_QUESTION, SET_SCORES, MAX_SCORES, GET_QUESTIONS, CLEAR_STORE} from '../Constants/constants'

const initialState = {
  numberQuestion: 0,
  maxScores: 0,
  countedScores: 0,
  questionsAll: null
}

export default function questionsReducer(state = initialState, action) {

  let stateCopy = {...state}

  switch (action.type) {

    case GET_QUESTIONS: {
      stateCopy.questionsAll = action.payload
      return stateCopy
    }
    case SET_NUMBER_QUESTION: {
      stateCopy.numberQuestion = action.payload + 1
      return stateCopy
    }
    case MAX_SCORES: {
      stateCopy.maxScores = action.payload.length - 1
      return stateCopy
    }
    case SET_SCORES: {
      if (action.payload) {
        stateCopy.countedScores = stateCopy.countedScores += 1
      } else {
        stateCopy.countedScores = stateCopy.countedScores -= 0
      }
      return stateCopy
    }
    case CLEAR_STORE: {
      stateCopy.numberQuestion = 0
      stateCopy.maxScores = 0
      stateCopy.countedScores = 0
      stateCopy.questionsAll = null
      return stateCopy
    }
    default:
      return state
  }
}





