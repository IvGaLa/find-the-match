import React, { useEffect, useState } from 'react'
import DificultadButton from './DificultadButton'

function Dificultad({ setCartasTotales, setSegundosDeEspera, setVidas }) {
  const typesDificulty = {
    easy: {
      id: 'easy',
      name: 'Fácil',
      cards: 5,
      vidas: 5,
      timeToView: 1000 * 5 // 5 segundos para ver las cartas falladas
    },
    medium: {
      id: 'medium',
      name: 'Medio',
      cards: 10,
      vidas: 4,
      timeToView: 1000 * 3 // 3 segundos para ver las cartas falladas
    },
    hard: {
      id: 'hard',
      name: 'Difícil',
      cards: 20,
      vidas: 3,
      timeToView: 1000 * 1 // 1 segundo para ver las cartas falladas
    }
  }

  const [dificulty, setDificulty] = useState(typesDificulty['easy'])

  useEffect(() => {
    setCartasTotales(dificulty.cards)
    setVidas(dificulty.vidas)
  }, [])


  const handlerDificulty = (e) => {
    e.preventDefault()
    setDificulty(typesDificulty[e.target.value])
    setCartasTotales(typesDificulty[e.target.value].cards)
    setSegundosDeEspera(typesDificulty[e.target.value].timeToView)
    setVidas(typesDificulty[e.target.value].vidas)
  }

  return (
    <div className='m-4 pb-5'>
      <p>
        Nivel de dificultad seleccionado: <span>{dificulty.name}</span>
      </p>
      <DificultadButton typeDificulty={typesDificulty.easy} handlerDificulty={handlerDificulty} dificulty={dificulty} />
      <DificultadButton typeDificulty={typesDificulty.medium} handlerDificulty={handlerDificulty} dificulty={dificulty} />
      <DificultadButton typeDificulty={typesDificulty.hard} handlerDificulty={handlerDificulty} dificulty={dificulty} />
    </div>
  )
}

export default Dificultad
