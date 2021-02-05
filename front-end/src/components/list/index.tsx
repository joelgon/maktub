import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IPersonagem } from '../../pages/listing'

import './styles.css'

interface ListProps {
  personagemarray: IPersonagem[]
}

const List: React.FC<ListProps> = ({ personagemarray }: ListProps) => {
  const history = useHistory()
  const [personagens, setPersonagens] = useState<IPersonagem[]>([])

  useEffect(() => {
    setPersonagens(personagemarray)
  }, [personagemarray])

  return (
    <div className="body-list">
      {personagens.map((personagem, index) => (
        <span
          style={{ gridArea: `span-${index + 1}` }}
          key={personagem.id}
          className="card"
          onClick={() => history.push(`/update/${personagem.id}`)}
        >
          <div className="avatar">
            <img
              src={personagem.url_imagem}
              alt="personagem img"
              className="img-avatar"
            />
          </div>

          <div className="infos">
            <p className="personagem-nome">{personagem.nome}</p>
            <div className="personagem-description">
              {personagem.descricao_curta}
            </div>
          </div>
        </span>
      ))}
    </div>
  )
}

export default List
