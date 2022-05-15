const path = require("path")
const felhasználó = require("../models/felhasználó")
const bcrypt = require("bcrypt")
const passport = require("passport")

const getLogin = (req, res) => {
    res.render("login", { isLogin : true, title: "Bejelentkezés" })
}

const getReg = (req, res) => {
    res.render("reg", { isReg : true, title: "Regisztráció" })
}

const postReg = async (req, res) => {
    const { vezeteknev, keresztnev, fizetes, bszam, email, szuletesnap, telefonszam, jelszo, ertekeles } = req.body
    const foglalt = await felhasználó.exists({email})
    const szamRegex = /\d/
    const csakSzamRegex = /^(?=.*\d)[\d ]+$/
    
    if(foglalt) {
      req.flash("email", "A megadott email már foglalt!")
      return res.redirect("/regisztracio")
    }

    if(szamRegex.test(vezeteknev) || szamRegex.test(keresztnev)) {
      req.flash("email", "Nem megfelelő nevet adott meg!")
      return res.redirect("/regisztracio")
    }
    if(!csakSzamRegex.test(bszam)) {
      req.flash("email", "Nem megfeleől számlaszámot adott meg!")
      return res.redirect("/regisztracio")
    }
    else if(bszam.length > 19 || bszam.length < 16) {
      console.log(bszam.length)
      req.flash("email", "A számlaszámnak 16 jegyűnek kell lennie (elválaszthatja szóközzel)!")
      return res.redirect("/regisztracio")
    }

    if(jelszo.length > 12) {
      req.flash("jelszo", "A jelszó nem lehet hosszabb 12 karakternél.")
      return res.redirect("/regisztracio")
    }

    if(isNaN(telefonszam)) {
      req.flash("telefonszam", "Nem megfelelő telenofszámot adott meg.")
      return res.redirect("/regisztracio")
    }

    const hasheltJelszó = await bcrypt.hash(jelszo, 10)

    const ujFelhasználó = new felhasználó({
       keresztnév: keresztnev,
       vezetéknév: vezeteknev,
       fizetés_módja: fizetes,
       bankszámlaszám: bszam,
       email: email,
       születésnap: szuletesnap,
       jelszó: hasheltJelszó,
       telefonszám: telefonszam,
       értékelés: ertekeles
      })

      ujFelhasználó.save().then( () =>{
        return res.redirect("/")
      })
      .catch(error => {
        console.log(error)
        return res.redirect("/regisztracio")
      })
}

const postLogin = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if(error) {
          console.log(error)
          return next(error)
        }
    
        if(!user) {
          req.flash("nincs", info.message)
          return res.redirect("/bejelentkezes")
        }
    
        req.login(user, error => {
          if(error) {
            console.log(error)
            return next(error)
          }
     
          return res.redirect("/")
        })
      })(req, res, next)
}

const postKijelentkezes = (req,res) => {
  req.logout()
  return res.redirect("/bejelentkezes")
}

module.exports = { getLogin, getReg, postLogin, postReg, postKijelentkezes } 