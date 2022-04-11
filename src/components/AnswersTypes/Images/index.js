import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {countScoresAC, currentQuestionsAC} from '../../../redux/Actions/actions'
import Swal from 'sweetalert2'
import {persistor} from '../../../index'
import '../../../assets/css/style.scss'

const Images = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.questions)
  const questionsAll = state.questionsAll
  const numberQuestion = state.numberQuestion
  const amountQuestions = state.maxScores
  const [imagesAll, setImagesAll] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState(null)

  useEffect(() => {
    setImagesAll(questionsAll[numberQuestion].images)
    setCorrectAnswer(questionsAll[numberQuestion].images.filter(item => item.correct === true))
  }, [numberQuestion]);

  const trueAnswer = async (img) => {
    if (img.correct) {
      await Swal.fire({
        icon: 'success',
        title: 'Отлично!</br> Правильный ответ'
      })
      dispatch(countScoresAC(true))
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Правильный ответ',
        imageUrl: correctAnswer[0].image,
        imageWidth: 'auto',
        imageHeight: 150,
        borderImage: '1px solid #cdcdcd',
        backgroundImage: '#cdcdcd'
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

  return (
    <div className="answer__img">
      {
        imagesAll?.map((img, index) => (
          <div key={index} className="answer__imgBlock" onClick={() => trueAnswer(img)}>
            <img src={img.image} alt="img"/>
          </div>
        ))
      }
    </div>
  )
}
export default Images
