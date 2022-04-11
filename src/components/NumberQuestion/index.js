import {useSelector} from 'react-redux'
import '../../assets/css/style.scss'
import cn from 'classnames'

const NumberQuestion = () => {
  const state = useSelector(state => state.questions)
  const currentNumberQuestion = state.numberQuestion
  const questionsAll = state.questionsAll.slice(1)

  return (
    <>
      <div className="answer__scale">
      {
        questionsAll.map((item, i) => <span key={i} className={cn("answer__scale-item", {
          "active": currentNumberQuestion === i + 1
        })}>{i + 1}</span>)
      }
      </div>
      <div className="answer__numberQuestion">
        Вопрос №{currentNumberQuestion}
      </div>
    </>
  )
}
export default NumberQuestion

