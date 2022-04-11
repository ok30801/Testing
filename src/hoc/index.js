import './style.scss'
import cn from 'classnames'

const Layout = props => (

  <div className={cn("Layout", {
    "left": props.animationClass === 'left',
    "right": props.animationClass === 'right',
    "top": props.animationClass === 'top',
    "bottom": props.animationClass === 'bottom',
  })}>
    {props.children}
  </div>

)

export default Layout
