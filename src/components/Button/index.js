import '../../assets/css/style.scss'
import cn from 'classnames'


const Button = ({disabled, onClick, text, url, color}) => {

    return (
        <button disabled={disabled}
                className={cn("answer__btn", {
                    "answer__green": color === 'green',
                    "answer__red": color === 'red',
                    "disabled": disabled
                })}
                onClick={onClick}>
            {text}{url}
        </button>
    )
}

export default Button
