import { v4 } from 'uuid';
import Knex from '../config/database';

export interface Personagem {
  nome: string;
  descricao_curta: string;
  descricao_completa: string;
  url_imagem: string;
}

export interface IPersonagem extends Personagem {
  id: string;
}

export default class PersonagemRepository {

  async index(): Promise<IPersonagem[]> {
    try {
      return await Knex('personagens');
    } catch (error) {
      return error
    }
  }

  async create(personagem: Personagem): Promise<void> {
    try {
      await Knex('personagens').insert({
        id: v4(),
        nome: personagem.nome,
        descricao_curta: personagem.descricao_curta,
        descricao_completa: personagem.descricao_completa,
        url_imagem: personagem.url_imagem
      })
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<IPersonagem> {
    try {
      const personagem: IPersonagem = await Knex.select('*').from('personagens').where({ id: id }).first();
      return personagem;
    } catch (error) {
      return error;
    }
  }

  async update(personagem: IPersonagem): Promise<void> {
    try {
      await Knex.update(personagem).from('personagens').where({ id: personagem.id });
    } catch (error) {
      return error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Knex.delete().from('personagens').where({id: id});
    } catch (error) {
      return error;
    }
  }

}