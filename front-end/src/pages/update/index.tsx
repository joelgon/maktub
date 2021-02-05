import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { personagemApi } from '../../services/api'
import { IPersonagem } from '../listing'
import './styles.css'

const Update: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const [personagem, setPersonagem] = useState<IPersonagem>({} as IPersonagem)
  const [url, setUrl] = useState('')

  const getPersonagem = async (id: string): Promise<void> => {
    try {
      const res = await personagemApi.get(`find-by-id/${id}`)
      setPersonagem(res.data)
      setUrl(res.data.url_imagem)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const res = location.pathname.split('/update/')
    getPersonagem(res[1])
  }, [])

  const updatePersonagem = async (): Promise<void> => {
    try {
      await personagemApi.put('update', personagem)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const deletePersonagem = async (): Promise<void> => {
    try {
      await personagemApi.delete(`/delete/${personagem.id}`)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="body">
      <div className="body-update">
        <div className="card-complete">
          <span>
            <img src={url} alt="avatar img" />
          </span>

          <div className="all-info-personagem">
            <div className="label-float" style={{ marginTop: '0px' }}>
              <input
                name="nome"
                type="text"
                placeholder=""
                required
                value={personagem.nome}
                onChange={({ target }) =>
                  setPersonagem({ ...personagem, nome: target.value })
                }
              />
              <label>Nome</label>
            </div>

            <div className="label-float">
              <input
                name="descricao_curta"
                type="text"
                placeholder=" "
                required
                value={personagem.descricao_curta}
                onChange={({ target }) =>
                  setPersonagem({
                    ...personagem,
                    descricao_curta: target.value,
                  })
                }
              />
              <label>Descrição curta</label>
            </div>

            <div className="label-float">
              <input
                name="url_imagem"
                type="text"
                placeholder=" "
                required
                value={personagem.url_imagem}
                onChange={({ target }) =>
                  setPersonagem({ ...personagem, url_imagem: target.value })
                }
              />
              <label>Url da imagem</label>
            </div>

            <div className="label-float">
              <textarea
                name="descricao_completa"
                rows={20}
                required
                value={personagem.descricao_completa}
                onChange={({ target }) =>
                  setPersonagem({
                    ...personagem,
                    descricao_completa: target.value,
                  })
                }
              />
              <label>Descrição completa</label>
            </div>

            <button
              type="button"
              className="button-green custom-button Yellow"
              onClick={() => updatePersonagem()}
            >
              Atualizar
            </button>
            <button
              type="button"
              className="button-green custom-button red"
              onClick={() => deletePersonagem()}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
