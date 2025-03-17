const express = require('express');
const Questionnaire = require('../models/questionnaire');
const router = express.Router();

router.get('/', async (req, res) => {
  const { sortBy, order, page, limit } = req.query;
  const questionnaires = await Questionnaire.findAll({ sortBy, order, page: +page, limit: +limit });
  res.json(questionnaires);
});

router.post('/', async (req, res) => {
  const id = await Questionnaire.create(req.body);
  res.status(201).json({ id });
});

router.get('/:id', async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id);
  res.json(questionnaire);
});

router.put('/:id', async (req, res) => {
  await Questionnaire.update(req.params.id, req.body);
  res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
  await Questionnaire.delete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;