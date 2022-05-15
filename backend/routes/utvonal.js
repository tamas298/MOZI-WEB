const express = require("express")
const felhasznaloController = require("../controllers/felhasznaloController")
const foglalasController = require("../controllers/foglalasController")
const altalanosController = require("../controllers/altalanosController")
const router = express.Router()

router.get("/", altalanosController.getIndex)
router.get("/regisztracio", bejelentkezve, felhasznaloController.getReg)
router.get("/bejelentkezes", felhasznaloController.getLogin)
router.get("/foglalas", nincsBejelentkezve, foglalasController.getSzek)
router.get("/torles", nincsBejelentkezve, foglalasController.töröl)
router.get("/kijelentkezes", felhasznaloController.postKijelentkezes)

router.post("/regisztracio", bejelentkezve, felhasznaloController.postReg)
router.post("/bejelentkezes", felhasznaloController.postLogin)
router.post("/foglalas", nincsBejelentkezve, foglalasController.foglalas)

router.get("*", altalanosController.get404)

function nincsBejelentkezve (req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

function bejelentkezve (req, res, next) {
  if(!req.isAuthenticated()) {
      return next()
  }
  return res.redirect('/')
}

module.exports = router