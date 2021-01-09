const { Router } = require('express');

const routes = () => {
  // eslint-disable-next-line global-require
  const diagnosesRoutes = require('./diagnoses');
  // eslint-disable-next-line global-require
  const imagingsRoutes = require('./imagings');

  const router = Router();
  router.use('/diagnoses', diagnosesRoutes);
  router.use('/imagings', imagingsRoutes);
  return router;
};

module.exports = routes;
