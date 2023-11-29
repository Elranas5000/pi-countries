const { Router } = require("express"); //para definir las rutas de express
//controladores:
const { getAllCountriesDB } = require("../controllers/getAllCountriesDB");
const { getCountryById } = require("../controllers/getCountryById");
const getCountriesByName = require("../controllers/getCountriesByName")
const { postActivity } = require("../controllers/postActivity");
const { getActivities } = require("../controllers/getActivities");
const deleteActivity = require("../controllers/deleteActivities");

const router = Router(); //enrutador

//rutas:
router.get("/countries/name", getCountriesByName)

router.get("/countries/:idPais", getCountryById);

router.get("/countries", getAllCountriesDB);

router.get("/activities", getActivities);

router.post('/activities', postActivity);

router.delete("/activities/:id", deleteActivity)

module.exports = router;

