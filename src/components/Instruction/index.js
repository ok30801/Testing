import React, {useEffect, useState} from 'react'
import {getData} from '../../utils/api'
import '../../assets/css/style.scss'

const Instruction = () => {
  const [title, setTitle] = useState([])
  const [text, setText] = useState([])

  useEffect(() => {
    getData().then(data => {
      setTitle(data[0].title)
      setText(data[0].text)
    })
  }, [])

  return (
    <>
      <div className="answer__instruction-title" dangerouslySetInnerHTML={{__html: title}}/>
      <div className="answer__instruction-text" dangerouslySetInnerHTML={{__html: text}}/>
    </>
  )
}
export default Instruction
