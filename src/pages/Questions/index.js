import Layout from '../../hoc/index'
import NumberQuestion from '../../components/NumberQuestion'
import Question from '../../components/Question'
import Buttons from '../../components/AnswersTypes/Buttons'
import Images from '../../components/AnswersTypes/Images'
import Checkboxes from '../../components/AnswersTypes/Сheckboxes'
import RadioButton from '../../components/AnswersTypes/RadioButton'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getData} from '../../utils/api'

const Questions = () => {

  const state = useSelector(state => state)
  const numberQuestion = state.questions.numberQuestion
  const [questionType, setQuestionType] = useState(null)
  const [animationClass, setAnimationClass] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        getData().then(data => {
          const type = data[numberQuestion].type
          setQuestionType(type)
          if (type === 'buttonsType') {
            setAnimationClass( 'bottom')
          } else if (type === 'multipleOptionsType') {
            setAnimationClass( 'top')
          } else if (type === 'oneOptionsType') {
            setAnimationClass( 'left')
          } else if (type === 'imagesType') {
            setAnimationClass( 'right')
          }
        })
      } catch (e) {
        console.log(e);
      }
    }
    loadData();
  }, [numberQuestion])


  const question = (type) => {
    if (type === 'buttonsType') {
      return <Buttons/>
    } else if (type === 'multipleOptionsType') {
      return <Checkboxes/>
    } else if (type === 'oneOptionsType') {
      return <RadioButton/>
    } else if (type === 'imagesType') {
      return <Images/>
    }
  }

  return (
    <Layout animationClass={animationClass}>
      <NumberQuestion/>
      <Question/>
      {question(questionType)}
    </Layout>
  )
}
export default Questions
