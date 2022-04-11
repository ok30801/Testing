import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import Layout from '../../hoc/index'
import {clearStoreAc} from '../../redux/Actions/actions'
import {persistor} from '../../index'
import {useHistory} from 'react-router-dom'
import Confetti from 'react-confetti'
import ReadMore from '@mui/icons-material/ReadMore'
import Button from '@mui/material/Button'
import '../../assets/css/style.scss'

const Result = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state.questions)
  const amountQuestions = state.maxScores
  const countedScores = state.countedScores
  const [colorFieldResult, setColorFieldResult] = useState(null)
  const [title, setTitle] = useState(null)
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    const awesomeResult = Math.floor(amountQuestions * 0.75)
    const goodResult = Math.floor(amountQuestions * 0.5)

    if (countedScores > awesomeResult) {
      setColorFieldResult('answer__scoreAwesome green')
      setTitle('Превосходный результат!')
      setConfetti(true)
    } else if (countedScores > goodResult) {
      setColorFieldResult('answer__scoreAwesome yellow')
      setTitle('Хороший результат!')
    } else if (countedScores <= goodResult) {
      setColorFieldResult('answer__scoreAwesome red')
      setTitle(`Плохой результат!`
      )
    }
  }, [])

  const testAgain = async () => {
    dispatch(clearStoreAc())
    await persistor.purge()
    await history.replace('/')
  }

  return (
    <Layout>
      <div className="answer__final">
        <div className="answer__titleFinal">{title}</div>
        <div className={colorFieldResult}>
          {countedScores}
        </div>
        <div className="answer__textFinal">
          Вы набрали {countedScores} балла(ов) из {amountQuestions} возможных
        </div>
      </div>
      <div className="answer__button-block">
        <Button
          className="answer__button-end"
          variant="outlined"
          startIcon={<ReadMore/>}
          onClick={testAgain}
        >
          Пройти тест заново
        </Button>
      </div>
      {
        confetti
          ? <Confetti/>
          : false
      }
    </Layout>
  )
}
export default Result
