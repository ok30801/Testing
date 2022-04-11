import {Route, Switch, Redirect} from 'react-router-dom'
import Main from './pages/Main/index'
import Result from './pages/Result'
import Questions from './pages/Questions'
import {useSelector} from 'react-redux'
import './App.css'

const App = () => {

    const state = useSelector(state => state)
    const currentNumberQuestion = state.questions.numberQuestion
    const numberQuestion = "/question/" + currentNumberQuestion.toString()

    return (
        <div className="App">
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path={numberQuestion} exact component={Questions}/>
                <Route path="/result" exact component={Result}/>
                <Redirect to="/404"/>
            </Switch>
        </div>
    )
}

export default App
