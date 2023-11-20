const { Router } = require("express");
const { getAllCountriesDB } = require("../controllers/getAllCountriesDB");
const { getCountryById } = require("../controllers/getCountryById");
const getCountriesByName = require("../controllers/getCountriesByName")
const { postActivity } = require("../controllers/postActivity");
const { getActivities } = require("../controllers/getActivities");
const deleteActivity = require("../controllers/deleteActivities");

const router = Router();

router.get("/countries/name", getCountriesByName)

router.get("/countries/:idPais", getCountryById);

router.get("/countries", getAllCountriesDB);

router.get("/activities", getActivities);

router.post('/activities', postActivity);

router.delete("/activities/:id", deleteActivity)

module.exports = router;

