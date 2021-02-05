const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);

const { diagnosisSchema } = require('../schemas');

const TIMESTAMPS = true;
const VERSION_KEY = false;

// eslint-disable-next-line max-len
const schema = new Mongoose.Schema(Joigoose.convert(diagnosisSchema), { timestamps: TIMESTAMPS, versionKey: VERSION_KEY });
schema.index({ imagingId: 1, diagnosis: 1 }, { unique: true });

module.exports = Mongoose.model('diagnoses', schema);
