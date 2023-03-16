const router = require('express').Router();

const EnterprisesController = require('../controllers/enterpriseController');

router.get('/', EnterprisesController.getAllEnterprises);

router.post('/', EnterprisesController.createEnterprise);

router.get('/:userId', EnterprisesController.getEnterpriseByUser);

router.get('/detail/:enterpriseId', EnterprisesController.getEnterpriseDetail);

router.patch('/:enterpriseId', EnterprisesController.updateEnterprise);

router.delete('/:enterpriseId', EnterprisesController.deleteEnterprise);

module.exports = router;