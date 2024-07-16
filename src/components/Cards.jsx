import cards from 'data/data.json'
import { useEffect, useState } from 'react';
import Dificultad from './Dificultad';
import Vidas from './Vidas'
import Gameover from './Gameover';


function Cards() {

  const typesOpacity = {
    mostrar: 'opacity-0',
    ocultar: 'opacity-100'
  }

  const imgDir = '/images/cards/' // Directorio de las imagenes

  const [segundosDeEspera, setSegundosDeEspera] = useState(1000 * 3) // Segundos que se espera cuando se falla hasta que oculta de nuevo las cartas

  const [cartasTotales, setCartasTotales] = useState(0) // Cuantas cartas (diferentes) se mostrarán

  const [cardsShuffle, setCardsShuffle] = useState() // Guarda las cartas del juego barajadas

  const [mostrar, setMostrar] = useState(true) // Lo uso para evitar que se puedan mostrar mas de dos cartas a la vez

  const [anterior, setAnterior] = useState(null) // Guardo la primera carta clickeada

  const [seedId, setSeedId] = useState() // Lo uso para poner un key diferente a cada card

  const [vidas, setVidas] = useState(5) // Número de vidas del jugador

  const [gameover, setGameover] = useState(false)

  const iniciamosJuego = () => {
    // Desordenamos el array dos veces y recuperamos solo los primeros 10 elementos
    const c = shuffle(shuffle(cards)).slice(0, cartasTotales)

    // Llenamos por dupliucador el array final con el array anterior y lo desordenamos para barajar las cartas finales.
    setCardsShuffle(shuffle([...c, ...c]))

    // Creamos un número aleatorio para los id's del map.
    setSeedId(Math.random())

    //setVidas(vidasIniciales)
  }

  useEffect(() => {
    iniciamosJuego()
  }, [cartasTotales])

  useEffect(() => {
    if (vidas === 0) {
      setGameover(true)
      setTimeout(() => {
        setGameover(false)
        //iniciamosJuego()
      }, 1000 * 5)
    }
  }, [vidas])

  const handlerClick = (data) => {
    if (mostrar) {
      const { e, card } = data

      // Mostramos la carta que hemos hecho click
      toggleClass({ "e": e, "remove": typesOpacity.ocultar, "add": typesOpacity.mostrar })

      if (anterior === null) { // Si es la primera carta clickeada, la asignamos a la "anterior"
        setAnterior(data)
      } else { // Si es la segunda carta que hemos clickeado
        // Impedimos que se puedan mostrar mas cartas, para que no se puedan ver otras cartas miestras se muestra que se ha fallado
        setMostrar(false)
        const { "e": eAnterior, "card": cardAnterior } = anterior

        // Si la cartaAnterior y la carta actual son diferentes (Hemos fallado)
        if (card !== cardAnterior) {

          // Hacemos un timeout para que se muestren las cartas que se han seleccionado pero son diferentes
          setTimeout(() => {
            toggleClass({ "e": e, "remove": typesOpacity.mostrar, "add": typesOpacity.ocultar })
            toggleClass({ "e": eAnterior, "remove": typesOpacity.mostrar, "add": typesOpacity.ocultar })

            // Permitimos que se vuelvan a poder mostrar las cartas
            setMostrar(true)
          }, segundosDeEspera)
          setVidas(vidas - 1)
        } else { // Si hemos acertado la pareja

          // Permitimos el seguir jugando
          setMostrar(true)
        }

        // Si ya hemos hecho click en dos cartas, entonces la anterior la debemos anular
        setAnterior(null)
      }
    }
  }

  // Intercambiamos las class para mostrar/ocultar las cartas
  const toggleClass = (data) => {
    data.e.target.classList.remove(data.remove)
    data.e.target.classList.add(data.add)
  }

  // Desordenamos el array de las cartas
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

  return (
    <>
      <div className='grid grid-cols-3'>
        <Dificultad setCartasTotales={setCartasTotales} setSegundosDeEspera={setSegundosDeEspera} setVidas={setVidas} />
        {(gameover === true) && <Gameover />}
        <Vidas vidas={vidas} />
      </div>

      <div className='grid grid-cols-5 gap-y-2 place-items-center'>
        {
          (cardsShuffle) &&
          cardsShuffle.map((card, index) => (
            <div key={`${seedId}-${index}`} className='relative h-[135px] w-[135px] bg-orange-200 border rounded-full'>
              <img className='absolute top-0 left-0 h-full w-full object-cover rounded-full' src={`${imgDir}${card}`} alt="." />
              <img onClick={(e) => handlerClick({ e, card })} className={`${typesOpacity.ocultar} absolute top-0 left-0 h-full w-full object-cover rounded-full`} src={`${imgDir}back.png`} alt="." />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Cards
