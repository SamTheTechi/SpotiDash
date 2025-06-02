const { Router } = require(`express`);
const { login, callback } = require(`../controller/oauth`);

const router = Router();

router.get(`/login`, login);
router.get(`/callback`, callback);

module.exports = router;
