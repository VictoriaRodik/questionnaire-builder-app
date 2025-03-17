const db = require('../config/db');

class Questionnaire {
  static async create({ name, description, questions }) {
    const [result] = await db.query(
      'INSERT INTO questionnaires (name, description, questions) VALUES (?, ?, ?)',
      [name, description, JSON.stringify(questions)]
    );
    return result.insertId;
  }

  static async findAll({ sortBy = 'name', order = 'ASC', page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const [rows] = await db.query(
      `SELECT * FROM questionnaires ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM questionnaires WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, data) {
    const [result] = await db.query(
      'UPDATE questionnaires SET ? WHERE id = ?',
      [data, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM questionnaires WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async incrementCompletions(id) {
    await db.query('UPDATE questionnaires SET completions = completions + 1 WHERE id = ?', [id]);
  }
}

module.exports = Questionnaire;