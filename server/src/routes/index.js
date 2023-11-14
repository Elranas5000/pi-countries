const { Router } = require("express");

const {getAllCountriesDB} = require("../controllers/getAllCountriesDB")
const {getCountryById} = require("../controllers/getCountryById")
const {getCountriesByName} = require("../controllers/getCountriesByName")
const {postActivity} = require("../controllers/postActivity")
const {getActivities} = require("../controllers/getActivities")

const router = Router();

router.get("/countries", getAllCountriesDB)
router.get("/countries/:idPais", getCountryById) //tener en cuenta que "idPais" será el cca3 de la api, por ejemplo si quiero obtener a Sierra Leone, deberia usar la ruta http://localhost:3001/countries/SLE, siendo SLE la pk del pais.
router.get("/countries/name", getCountriesByName)
router.get("/activities", getActivities)

router.post('/activities', postActivity);

module.exports = router;
