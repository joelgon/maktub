import { v4 } from 'uuid';
import { Request, Response } from 'express';
import Knex from '../config/database';

interface PersonagemReq {
  nome: string;
  descricao_curta: string;
  descricao_completa: string;
  url_imagem: string;
}

export interface IPersonagem extends PersonagemReq {
  id: string;
}

export default class Personagem {

  async index (req: Request, res: Response): Promise<Response<IPersonagem[]>> {
    try {
      const personagens: IPersonagem[] = await Knex('personagens');
      return res.status(200).json(personagens);
    } catch (error) {
      return res.status(500).json(error);
    } 
  }

  async create (req: Request, res: Response): Promise<Response> {

    const personagem: PersonagemReq = req.body;

    try {
      await Knex('personagens').insert({
        id: v4(),
        nome: personagem.nome,
        descricao_curta: personagem.descricao_curta,
        descricao_completa: personagem.descricao_completa,
        url_imagem: personagem.url_imagem
      })

      return res.status(200).json({ message: 'OK'});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findById (req: Request, res: Response): Promise<Response<IPersonagem>> {
    const { id } = req.params

    try {
      const personagem: IPersonagem[] = await Knex.select('*').from('personagens').where({ id: id })
      return res.status(200).json(personagem[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update (req: Request, res: Response): Promise<Response<IPersonagem>> {
    const personagem: IPersonagem = req.body;

    try {
      await Knex.update(personagem).from('personagens').where({ id: personagem.id });
      return res.status(200).json(personagem);
    } catch (error) {
    return res.status(500).json(error);
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      await Knex.delete().from('personagens').where({id: id});
      return res.status(200).json({message: 'OK'});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
