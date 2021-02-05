import React, { useEffect, useState } from 'react'
import { personagemApi } from '../../services/api'
import { Personagem } from '../register'
import List from '../../components/list'

import './styles.css'

export interface IPersonagem extends Personagem {
  id: string
}

const Listing: React.FC = () => {
  const [personagens, setPersonagens] = useState<IPersonagem[]>([])
  const [personagemarray, setPersonagemarray] = useState<IPersonagem[]>([])
  const [arrayIndex, setArrayIndex] = useState(0)
  const [arrayLength, setArrayLength] = useState(0)

  const handlePersonagens = async (): Promise<void> => {
    try {
      const res = await personagemApi.get('find-all')
      setPersonagens(res.data)
      const flag: IPersonagem[] = []

      for (let index = 0; index < res.data.length; index += 1) {
        if (flag.length < 9) {
          flag.push(res.data[index])
        } else {
          setArrayIndex(index)
          break
        }
      }
      setPersonagemarray(flag)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handlePersonagens()
  }, [])

  const advance = (): void => {
    const flag: IPersonagem[] = []
    for (let index = arrayIndex; index < personagens.length; index += 1) {
      if (flag.length < 9) {
        flag.push(personagens[index])
        if (index + 1 === personagens.length) {
          setArrayLength(flag.length)
          setArrayIndex(personagens.length)
          break
        }
      } else {
        setArrayIndex(index)
        break
      }
    }
    setPersonagemarray(flag)
  }

  const comeBack = (): void => {
    const flag: IPersonagem[] = []
    console.log(arrayLength)
    for (
      let index =
        arrayIndex === personagens.length
          ? arrayIndex - (9 + arrayLength)
          : arrayIndex - 18;
      index < personagens.length;
      index += 1
    ) {
      if (flag.length < 9) {
        flag.push(personagens[index])
      } else {
        setArrayIndex(index)
        break
      }
    }
    setPersonagemarray(flag)
  }

  return (
    <div className="body">
      <div className="body-listing">
        <List personagemarray={personagemarray} />
        <div className="handler-buttons">
          <button
            type="button"
            className="button-green edit-button"
            onClick={() => comeBack()}
            style={{
              backgroundColor: `${arrayIndex === 9 ? '#A9A9A9' : ''}`,
              borderColor: `${arrayIndex === 9 ? '#A9A9A9' : ''}`,
              cursor: `${arrayIndex === 9 ? 'default' : ''}`,
            }}
            disabled={arrayIndex === 9}
          >
            Voltar
          </button>
          <button
            type="button"
            className="button-green edit-button"
            onClick={() => advance()}
            style={{
              backgroundColor: `${
                arrayIndex === personagens.length ? '#A9A9A9' : ''
              }`,
              borderColor: `${
                arrayIndex === personagens.length ? '#A9A9A9' : ''
              }`,
              cursor: `${arrayIndex === personagens.length ? 'default' : ''}`,
            }}
            disabled={arrayIndex === personagens.length}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Listing
