const Mongoose = require('mongoose');
const Joigoose = require('joigoose')(Mongoose);

const { imagingSchema } = require('../schemas');

const TIMESTAMPS = true;
const VERSION_KEY = false;

// eslint-disable-next-line max-len
const schema = new Mongoose.Schema(Joigoose.convert(imagingSchema), { timestamps: TIMESTAMPS, versionKey: VERSION_KEY });
schema.index({ type: 1, bodyPart: 1 });

module.exports = Mongoose.model('imagings', schema);
