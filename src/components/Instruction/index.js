import React, {useEffect, useState} from 'react'
import {getData} from '../../utils/api'
import '../../assets/css/style.scss'

const Instruction = () => {
  const [text, setText] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        await getData().then(data => setText(data[0].text))
      } catch (e) {
          alert('Ошибка подключения')
        }
      }
    loadData();
  }, [])

  return (
    <div className="answer__instruction" dangerouslySetInnerHTML={{__html: text}}/>
  )
}
export default Instruction
