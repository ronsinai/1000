const ExpressJoi = require('express-joi-validation');
const { Router } = require('express');

const { getLogger } = require('../utils/logger');
const { ImagingsCollection } = require('../collections');
const { imagingSchema } = require('../schemas');

const imagings = new ImagingsCollection();
const logger = getLogger();
const router = Router();
const validator = ExpressJoi.createValidator();

router.post('/', validator.body(imagingSchema), async (req, res, next) => {
  const imaging = req.body;
  // eslint-disable-next-line object-curly-newline
  const { _id, type, bodyPart, metadata } = imaging;
  const { age, sex } = metadata;
  logger.info(`Received ${bodyPart} ${type} imaging ${_id} of ${age}y ${sex}`);

  try {
    const insertedImaging = await imagings.insert(imaging);
    res.send(insertedImaging);
    logger.info(`Responded with imaging ${_id}`);
  }
  catch (err) {
    res.status(400).send(err);
  }

  return next();
});

router.put('/:id/discharge', async (req, res, next) => {
  const imagingId = req.params.id;
  logger.info(`Requested to discharge imaging ${imagingId}`);

  try {
    const dischargedImaging = await imagings.discharge(imagingId);
    res.send(dischargedImaging);
    logger.info(`Responded with imaging ${imagingId}`);
  }
  catch (err) {
    res.status(400).send(err);
  }

  return next();
});

module.exports = router;
