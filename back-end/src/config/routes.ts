import { Application } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import Personagem from "../query/personagem";

export default class Routes {
  private Personagem : Personagem = new Personagem();

  public routes(server: Application): void {
    server.route("/find-all").get(this.Personagem.index);

    server.route("/create").post(celebrate({
      [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        descricao_curta: Joi.string().required(),
        descricao_completa: Joi.string().required(),
        url_imagem: Joi.string().required()
      })
    }), this.Personagem.create);

    server.route("/find-by-id/:id").get(celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      })
    }), this.Personagem.findById);

    server.route("/update").put(celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        nome: Joi.string().required(),
        descricao_curta: Joi.string().required(),
        descricao_completa: Joi.string().required(),
        url_imagem: Joi.string().required()
      })
    }), this.Personagem.update);

    server.route("/delete/:id").delete(celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      })
    }), this.Personagem.delete)

    server.use(errors());
  }
}