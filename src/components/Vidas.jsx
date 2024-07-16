import React from 'react'

function Vidas({ vidas }) {
  return (
    <p className='flex justify-end m-4'>
      {Array.from({ length: vidas }, (_, index) => (
        <span key={index} role="img">❤️</span>
      ))}
    </p>
  )
}

export default Vidas
