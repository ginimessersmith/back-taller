const { Response, Question, User } = require("../models");

exports.createResponse = async (req, res) => {
  try {
    const { description, questionId, userId } = req.body;
    const newResponse = await Response.create({
      description,
      QuestionId: questionId,
      UserId: userId,
    });
    return res.json(newResponse);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getResponse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Response.findByPk(id);
    if (response) {
      return res.json(response);
    } else {
      return res.status(404).send({
        mensaje: "Respuesta no encontrada!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la respuesta" });
  }
};

exports.getResponsesByUser = async (req, res) => {
  console.log(req.user);
  try {
    const responses = await Response.findAll({
      where: { UserId: req.user.id },
      include: {
        model: Question,
        attributes: ["id", "title"],
      },
    });

    return res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la respuesta" });
  }
};

exports.updateResponse = async (req, res, next) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const [updatedCount] = await Response.update(
      { description },
      { where: { id } }
    );
    if (updatedCount) {
      return res.json({ message: "Respuesta actualizada correctamente" });
    } else {
      return res.status(404).send({
        mensaje: "Respuesta no encontrada!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la respuesta" });
  }
};

exports.deleteResponse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedResponseCount = await Response.destroy({ where: { id } });
    if (deletedResponseCount) {
      return res.json({ message: "Respuesta eliminada correctamente" });
    } else {
      return res.status(404).send({
        mensaje: "Respuesta no encontrada!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la respuesta" });
  }
};