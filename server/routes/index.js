const { Router } = require('express');

const routes = () => {
  // eslint-disable-next-line global-require
  const diagnosesRoutes = require('./diagnoses');

  const router = Router();
  router.use('/diagnoses', diagnosesRoutes);
  return router;
};

module.exports = routes;
