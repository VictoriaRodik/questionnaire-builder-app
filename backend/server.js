const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const questionnaireRoutes = require('./src/routes/questionnaire');
app.use('/questionnaires', questionnaireRoutes);


