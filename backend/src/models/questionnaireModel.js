const pool = require("../config/db");

async function getAllQuestionnaires() {
  const [rows] = await pool.query("SELECT * FROM questionnaires");
  return rows;
}

async function getQuestionnaireById(id) {
  const [rows] = await pool.query("SELECT * FROM questionnaires WHERE id = ?", [id]);
  return rows[0];
}

async function addQuestionnaire(questionnaireData) {
  const { name, description, questions, completions = 0, created_at = new Date() } = questionnaireData;
  const [result] = await pool.query(
    `INSERT INTO questionnaires (name, description, questions, completions, created_at) 
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, JSON.stringify(questions), completions, created_at]
  );
  return result.insertId;
}

async function updateQuestionnaire(id, updatedData) {
  const { name, description, questions, completions = 0, created_at = new Date() } = updatedData;
  const [result] = await pool.query(
    `UPDATE questionnaires SET name=?, description=?, questions=?, completions=?, created_at=? 
     WHERE id = ?`,
    [name, description, JSON.stringify(questions), completions, created_at, id]
  );
  return result.affectedRows;
}

async function deleteQuestionnaire(id) {
  const [result] = await pool.query("DELETE FROM questionnaires WHERE id = ?", [id]);
  return result.affectedRows;
}

module.exports = {
  getAllQuestionnaires,
  getQuestionnaireById,
  addQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
};