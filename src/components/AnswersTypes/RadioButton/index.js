import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {countScoresAC, currentQuestionsAC} from '../../../redux/Actions/actions'
import Swal from 'sweetalert2'
import {persistor} from '../../../index'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import ReadMore from '@mui/icons-material/ReadMore'
import Button from '@mui/material/Button'
import '../../../assets/css/style.scss'


const RadioButton = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.questions)
  const numberQuestion = state.numberQuestion
  const amountQuestions = state.maxScores
  const questionsAll = state.questionsAll
  const answersList = questionsAll[numberQuestion].answers
  const [checked, setChecked] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  const [value, setValue] = useState('female');

  useEffect(() => {
    setCorrectAnswer(questionsAll[numberQuestion].answers.filter(item => item.correct === true))
  }, [numberQuestion])

  const nextQuestion = async () => {
    if (checked?.correct) {
      await Swal.fire({
        icon: 'success',
        title: 'Отлично!</br> Правильный ответ'
      })
      dispatch(countScoresAC(true))
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: 'Правильный ответ - ' + correctAnswer[0].text
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

  const handleChange = (event, item) => {
    setValue(event.target.value);
    setChecked(item)
    setDisableButton(false)
  };

  return (
    <div className="answer__block">
      <div className="answer__blockChecked">
        {
          answersList?.map(item => (
            <FormControl key={item.id}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(event) => handleChange(event, item)}
              >
                <FormControlLabel
                  value={item.text}
                  control={
                    <Radio />}
                  label={item.text} />
              </RadioGroup>
            </FormControl>
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
    </div>
  )
}
export default RadioButton
