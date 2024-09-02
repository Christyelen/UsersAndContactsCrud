const { Router } = require('express');

const { healthcheckStatus } = require('../controllers/status/healthcheck');
const { controllerErrorHandler } = require('../utils/controllerErrorHandler');
const v1 = require('./v1/index');

const router = Router();

router.get('/healthcheck', [], controllerErrorHandler(healthcheckStatus));
router.use('/api/v1', v1);

module.exports = router;
