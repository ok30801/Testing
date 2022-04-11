import {Link} from 'react-router-dom'
import {currentQuestionsAC, maxScoresAC, getQuestionsAC} from '../../redux/Actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import Layout from '../../hoc'
import Instruction from '../../components/Instruction'
import React, {useEffect, useState} from 'react'
import {getData} from '../../utils/api'
import ReadMore from '@mui/icons-material/ReadMore'
import Button from '@mui/material/Button'
import '../../assets/css/style.scss'

const Main = () => {

  const dispatch = useDispatch()
  const numberQuestion = useSelector(state => state.questions.numberQuestion)
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        await getData().then(data => {
          setQuestions(data)
        })
      } catch (e) {
        alert('Ошибка подключения')
      }
    }
    loadData();
  }, [numberQuestion]);

  const setNumberQuestion = () => {
    dispatch(maxScoresAC(questions))
    dispatch(currentQuestionsAC(numberQuestion))
    dispatch(getQuestionsAC(questions))
  }

  return (
    <Layout>
      <Instruction/>
      <div className="answer__button-block">
        <Link to={{
          pathname: 'question/' + (numberQuestion + 1)
        }}>
          <Button
            className="answer__button-next"
            variant="outlined"
            endIcon={<ReadMore />}
            onClick={setNumberQuestion}
          >
            Начать тест
          </Button>
        </Link>
      </div>
    </Layout>
  )
}
export default Main
