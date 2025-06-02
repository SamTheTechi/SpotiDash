const { Router } = require(`express`);

const { userLogin } = require(`../controller/login`);
const { updateWeekly } = require(`../controller/weekly`);
const { artists, songs, profile, playlist } = require("../controller/data");
const { cleanPlaylist } = require("../controller/clean");
const { tokenMiddleware } = require("../lib/cookie");

const router = Router();

router.get(`/profile`, tokenMiddleware, profile);
router.get(`/playlist`, tokenMiddleware, playlist);

router.post(`/login`, tokenMiddleware, userLogin);
router.post(`/updateWeekly`, tokenMiddleware, updateWeekly);
router.post(`/songs`, tokenMiddleware, songs);
router.post(`/artists`, tokenMiddleware, artists);

router.delete(`/clean`, tokenMiddleware, cleanPlaylist);

module.exports = router;
