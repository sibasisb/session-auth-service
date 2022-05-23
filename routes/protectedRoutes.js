const { dataController } = require('../controllers/dataController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/data/home', 
isLoggedIn,
dataController);

module.exports = router;
