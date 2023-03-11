const router = require('express').Router();

const EnterprisesController = require('../controllers/enterpriseController');

router.get('/', EnterprisesController.getAllEnterprises);

router.post('/', EnterprisesController.createEnterprise);

router.get('/:userId', EnterprisesController.getEnterpriseByUser);

router.patch('/:productId', EnterprisesController.updateEnterprise);

router.delete('/:productId', EnterprisesController.deleteEnterprise);

module.exports = router;