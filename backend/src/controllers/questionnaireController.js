const Questionnaire = require("../models/questionnaireModel");

async function getQuestionnaires(req, res) {
  try {
    const questionnaires = await Questionnaire.getAllQuestionnaires();
    res.json(questionnaires);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving questionnaires" });
  }
}

async function createQuestionnaire(req, res) {
  try {
    const newQuestionnaireId = await Questionnaire.addQuestionnaire(req.body);
    res
      .status(201)
      .json({
        id: newQuestionnaireId,
        message: "Questionnaire added successfully",
      });
  } catch (err) {
    res.status(500).json({ error: "Error adding questionnaire" });
  }
}

async function editQuestionnaire(req, res) {
  try {
    const updatedRows = await Questionnaire.updateQuestionnaire(
      req.params.id,
      req.body
    );
    if (updatedRows > 0) {
      res.json({ message: "Questionnaire updated successfully" });
    } else {
      res.status(404).json({ error: "Questionnaire not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating questionnaire" });
  }
}

async function removeQuestionnaire(req, res) {
  try {
    const deletedRows = await Questionnaire.deleteQuestionnaire(req.params.id);
    if (deletedRows > 0) {
      res.json({ message: "Questionnaire deleted successfully" });
    } else {
      res.status(404).json({ error: "Questionnaire not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error deleting questionnaire" });
  }
}

module.exports = {
  getQuestionnaires,
  createQuestionnaire,
  editQuestionnaire,
  removeQuestionnaire,
};
