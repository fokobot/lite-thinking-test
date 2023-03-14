const router = require('express').Router();

const ProductsController = require('../controllers/productController');

router.get('/', ProductsController.getAllProducts);

router.post('/', ProductsController.createProduct);

router.get('/:enterpriseId', ProductsController.getProdutsByEnterprise);

router.patch('/:productId', ProductsController.updateProduct);

router.delete('/:productId', ProductsController.deleteProduct);

router.post('/pdf/:enterpriseId', ProductsController.generatePDF);

module.exports = router;