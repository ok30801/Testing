import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {currentQuestionsAC, countScoresAC} from '../../../redux/Actions/actions'
import React, {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {persistor} from '../../../index'
import Button from '@mui/material/Button'
import '../../../assets/css/style.scss'

const Buttons = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.questions)
  const numberQuestion = state.numberQuestion
  const amountQuestions = state.maxScores
  const questionsAll = state.questionsAll
  const [correctAnswer, setCorrectAnswer] = useState(null)

  useEffect(() => {
    setCorrectAnswer(questionsAll[numberQuestion].answer)
  }, [numberQuestion]);

  const trueAnswer = async () => {
    if (correctAnswer) {
      await Swal.fire({
        icon: 'success',
        title: 'Отлично!</br> Правильный ответ'
      })
      dispatch(countScoresAC(true))
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Ошибка'
      })
    }
    dispatch(currentQuestionsAC(numberQuestion))

    if (numberQuestion < amountQuestions) {
      history.replace('question/' + (numberQuestion + 1))
    } else {
      history.replace('/result')
      await persistor.flush()
    }
  }
  const falseAnswer = async () => {
    if (!correctAnswer) {
      await Swal.fire({
        icon: 'success',
        title: 'Отлично!</br> Правильный ответ'
      })
      dispatch(countScoresAC(true))
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Ошибка'
      })
      dispatch(countScoresAC(false))
    }
    dispatch(currentQuestionsAC(numberQuestion))
    if (numberQuestion < amountQuestions) {
      history.replace('question/' + (numberQuestion + 1))
    } else {
      history.replace('/result')
      await persistor.flush()
    }
  }

  return (
    <div className="answer__buttons">
      <Button
        className="answer__button-next"
        variant="outlined"
        onClick={trueAnswer}
      >
        Да
      </Button>
      <Button
        className="answer__button-next"
        variant="outlined"
        onClick={falseAnswer}
      >
        Нет
      </Button>
    </div>
  )
}
export default Buttons
