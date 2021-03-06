import React, { useState } from 'react'

import './styles.css'

import { personagemApi } from '../../services/api'

export interface Personagem {
  nome: string
  descricao_curta: string
  descricao_completa: string
  url_imagem: string
}

const Register: React.FC = () => {
  const [personagem, setPersonagem] = useState<Personagem>({
    nome: '',
    descricao_curta: '',
    descricao_completa: '',
    url_imagem: '',
  })

  const registerPersonagem = async (
    event: React.MouseEvent | React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()
    try {
      const res = await personagemApi.post('create', personagem)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="body">
      <div className="body-register" />
      <form
        onSubmit={(event) => registerPersonagem(event)}
        className="resgister"
      >
        <div className="label-float" style={{ marginTop: '0px' }}>
          <input
            name="nome"
            type="text"
            placeholder=""
            required
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
            onChange={({ target }) =>
              setPersonagem({ ...personagem, descricao_curta: target.value })
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
          type="submit"
          className="button-green button-height"
          onClick={(e) => registerPersonagem(e)}
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}

export default Register
