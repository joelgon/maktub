import { Request, Response } from 'express';
import PersonagemRepository, { Personagem, IPersonagem } from '../repository/PersonagemRepository';

export default class PersonagemController {

  async index (req: Request, res: Response): Promise<Response<IPersonagem[]>> {
    try {
      const personagemRepository = new PersonagemRepository();
      const personagens = await personagemRepository.index();
      return res.status(200).json(personagens);
    } catch (error) {
      return res.status(500).json(error);
    } 
  }

  async create (req: Request, res: Response): Promise<Response> {

    const personagem: Personagem = req.body;

    try {
      const personagemRepository = new PersonagemRepository();
      await personagemRepository.create(personagem);
      return res.status(200).json({ message: 'OK'});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findById (req: Request, res: Response): Promise<Response<IPersonagem>> {
    const { id } = req.params

    try {
      const personagemRepository = new PersonagemRepository();
      const personagem: IPersonagem = await personagemRepository.findById(id)
      return res.status(200).json(personagem);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update (req: Request, res: Response): Promise<Response<IPersonagem>> {
    const personagem: IPersonagem = req.body;

    try {
      const personagemRepository = new PersonagemRepository();
      await personagemRepository.update(personagem);
      return res.status(200).json(personagem);
    } catch (error) {
    return res.status(500).json(error);
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const personagemRepository = new PersonagemRepository();
      await personagemRepository.delete(id);
      return res.status(200).json({message: 'OK'});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}
