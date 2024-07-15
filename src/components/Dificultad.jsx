import React, { useEffect, useState } from 'react'

function Dificultad( {setCartasTotales, setSegundosDeEspera} ) {
  const typesDificulty = {
    easy: {
      id: 'easy',
      name: 'Fácil',
      cards: 5,
      timeToView: 1000 * 5 // 5 segundos para ver las cartas falladas
    },
    medium: {
      id: 'medium',
      name: 'Medio',
      cards: 10,
      timeToView: 1000 * 3 // 3 segundos para ver las cartas falladas
    },
    hard: {
      id: 'hard',
      name: 'Difícil',
      cards: 20,
      timeToView: 1000 * 1 // 1 segundo para ver las cartas falladas
    }
  }

  const [dificulty, setDificulty] = useState(typesDificulty['easy'])

  useEffect(()=> {
    setCartasTotales(dificulty.cards)
  }, [])
  

  const handlerDificulty = (e) => {
    e.preventDefault()
    setDificulty(typesDificulty[e.target.value])
    setCartasTotales(typesDificulty[e.target.value].cards)
    setSegundosDeEspera(typesDificulty[e.target.value].timeToView)
  }

  return (
    <div >
      <p>
          Nivel de dificultad seleccionado: <span>{dificulty.name}</span>
      </p>

      <div className="flex">
        <div className="flex items-center h-5">
          <input 
            onChange={(e) => handlerDificulty(e)} 
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
            type="radio" 
            name="dificultad" 
            value={typesDificulty.easy.id} 
            id={typesDificulty.easy.id} 
            checked={(dificulty.id === typesDificulty.easy.id) ? true : false} />
        </div>
        <div className="ms-2 text-sm">
          <label htmlFor={typesDificulty.easy.id}  className="font-medium text-gray-900 dark:text-gray-300">
            {typesDificulty.easy.name}
          </label>
          <p className="text-xs font-normal text-gray-500 dark:text-gray-300">{typesDificulty.easy.cards} pares de cartas a encontrar.</p>
        </div>
      </div>

      <div className="flex">
        <div className="flex items-center h-5">
          <input 
            onChange={(e) => handlerDificulty(e)} 
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
            type="radio" 
            name="dificultad" 
            value={typesDificulty.medium.id} 
            id={typesDificulty.medium.id} 
            checked={(dificulty.id === typesDificulty.medium.id) ? true : false} />
        </div>
        <div className="ms-2 text-sm">
          <label htmlFor={typesDificulty.medium.id}  className="font-medium text-gray-900 dark:text-gray-300">
            {typesDificulty.medium.name}
          </label>
          <p className="text-xs font-normal text-gray-500 dark:text-gray-300">{typesDificulty.medium.cards} pares de cartas a encontrar.</p>
        </div>
      </div>

      <div className="flex">
        <div className="flex items-center h-5">
          <input 
            onChange={(e) => handlerDificulty(e)} 
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
            type="radio" 
            name="dificultad" 
            value={typesDificulty.hard.id} 
            id={typesDificulty.hard.id} 
            checked={(dificulty.id === typesDificulty.hard.id) ? true : false} />
        </div>
        <div className="ms-2 text-sm">
          <label htmlFor={typesDificulty.hard.id}  className="font-medium text-gray-900 dark:text-gray-300">
            {typesDificulty.hard.name}
          </label>
          <p className="text-xs font-normal text-gray-500 dark:text-gray-300">{typesDificulty.hard.cards} pares de cartas a encontrar.</p>
        </div>
      </div>

    </div>
  )
}

export default Dificultad
