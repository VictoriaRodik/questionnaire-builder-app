const express = require("express");
const router = express.Router();
const {
  getQuestionnaires,
  createQuestionnaire,
  editQuestionnaire,
  removeQuestionnaire,
} = require("../controllers/questionnaireController");

router.get("/", getQuestionnaires);
router.get("/:id", async (req, res) => {
  try {
    const questionnaire =
      await require("../models/questionnaireModel").getQuestionnaireById(
        req.params.id
      );
    if (questionnaire) {
      res.json(questionnaire);
    } else {
      res.status(404).json({ error: "Questionnaire not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error retrieving questionnaire" });
  }
});
router.post("/", createQuestionnaire);
router.put("/:id", editQuestionnaire);
router.delete("/:id", removeQuestionnaire);

module.exports = router;
