import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
import {countScoresAC, currentQuestionsAC} from '../../../redux/Actions/actions'
import {persistor} from '../../../index'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ReadMore from '@mui/icons-material/ReadMore'
import Button from '@mui/material/Button'
import '../../../assets/css/style.scss'

const Checkboxes = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.questions)
  const numberQuestion = state.numberQuestion
  const amountQuestions = state.maxScores
  const questionsAll = state.questionsAll
  const [answersList, setAnswersList] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  const [checkedList, setCheckedList] = useState([])

  useEffect(() => {

    setAnswersList(
      questionsAll[numberQuestion].answers.map((item, index) => {
        return {
          select: false,
          id: index,
          text: item.text,
          correct: item.correct,
        };
      })
    )
    setCorrectAnswer(questionsAll[numberQuestion].answers.filter(item => item.correct === true))
  }, [numberQuestion])

  const nextQuestion = async () => {
    const correctChecked = answersList.filter(item => item.select === true && item.correct === true)
    const incorrectChecked = answersList.filter(item => item.select === true && item.correct === false)

    const showRightAnswers = () => {
      return correctAnswer.reduce((acc, item) => {
        return acc + `<li>${item.text}</li>`
      }, '')
    }
    if (correctChecked.length <= answersList.length && incorrectChecked.length === 0 && correctChecked.length !== 0) {
      await Swal.fire({
        icon: 'success',
        title: 'Отлично!</br> Правильный ответ'
      })
      dispatch(countScoresAC(true))
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        html:
          `<div class="answer__rightAnswersBlock">
            <p class="answer__rightAnswersTitle">Правильные ответы:</p>
            <ol class="answer__rightAnswersList">
              ${showRightAnswers()}
            </ol>
          </div>`
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

  const handleChange = (event, id) => {
    setAnswersList(
      answersList.map(data => {
        if (id === data.id) {
          data.select = event.target.checked;
        }
        return data;
      })
    );
    if (event.target.checked) {
      checkedList.push(event.target.checked)
    } else {
      checkedList.pop()
    }
    setDisableButton(!checkedList.length)
  };

  return (
    <>
      <div className="answer__blockChecked">
        {
          answersList?.map((item, index) => (
            <FormGroup key={item.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => handleChange(event, item.id)}
                  />
                }
                label={item.text}
              />
            </FormGroup>
          ))
        }
      </div>

      <div className="answer__button-block">
        <Button
          className="answer__button-next"
          variant="outlined"
          startIcon={<ReadMore/>}
          onClick={nextQuestion}
          disabled={disableButton}
        >
          Далее
        </Button>
      </div>
    </>
  )
}
export default Checkboxes
