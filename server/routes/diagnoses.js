const ExpressJoi = require('express-joi-validation');
const { Router } = require('express');

const { DiagnosesCollection } = require('../collections');
const { diagnosisSchema } = require('../schemas');
const { getLogger } = require('../utils/logger');

const diagnoses = new DiagnosesCollection();
const logger = getLogger();
const router = Router();
const validator = ExpressJoi.createValidator();

router.post('/', validator.body(diagnosisSchema), async (req, res, next) => {
  const diagnosis = req.body;
  logger.info(`Received ${diagnosis.diagnosis} diagnosis of imaging ${diagnosis.imagingId}`);

  try {
    const insertedDiagnosis = await diagnoses.insert(diagnosis);
    res.send(insertedDiagnosis);
    logger.info(`Responded with updated ${diagnosis.diagnosis} diagnosis of imaging ${diagnosis.imagingId}`);
  }
  catch (err) {
    res.status(400).send(err);
  }

  return next();
});

module.exports = router;
