import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getData} from '../../utils/api'
import '../../assets/css/style.scss'

const Question = () => {

  const questionText = useRef()
  const numberQuestion = useSelector(state => state.questions.numberQuestion)
  const [question, setQuestion] = useState(null)
  const [code, setCode] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        getData().then(data => {
          setQuestion(data[numberQuestion].question)
          setCode(data[numberQuestion].code)
        })
      } catch (e) {
        console.log(e);
      }
    }
    loadData();
  }, [numberQuestion]);

  return (
    <div ref={questionText} className="question">
      <div className="question__text" dangerouslySetInnerHTML={{__html: question}}/>
      {
        code
          ? <pre className="question__code-block"><code className="question__code" dangerouslySetInnerHTML={{__html: code}}/></pre>
          : false
      }
    </div>
  )
}
export default Question
