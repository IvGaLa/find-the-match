import React from 'react'

function DificultadButton({ typeDificulty, handlerDificulty, dificulty }) {
  return (
    <div className="flex pb-2">
      <div className="flex items-center h-5">
        <input
          onClick={(e) => handlerDificulty(e)}
          onChange={(e) => handlerDificulty(e)}
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
          type="radio"
          name="dificultad"
          value={typeDificulty.id}
          id={typeDificulty.id}
          checked={(dificulty.id === typeDificulty.id) ? true : false} />
      </div>
      <div className="ms-2 text-sm">
        <label htmlFor={typeDificulty.id} className="font-medium text-gray-900 dark:text-gray-300">
          {typeDificulty.name}
        </label>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-300">{typeDificulty.cards} pares de cartas a encontrar.</p>
      </div>
    </div>
  )
}

export default DificultadButton
