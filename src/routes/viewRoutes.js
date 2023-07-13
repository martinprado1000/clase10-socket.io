const { Router } = require ("express")

const { home , webSockets } = require("../controllers/controllersViews")

const router = Router();

router.get("/home", home);

router.get("/websockets", webSockets);


module.exports = router ;

