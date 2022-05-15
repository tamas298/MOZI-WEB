const LocalStrategy = require('passport-local').Strategy
const Felhasználó = require('../models/felhasználó')
const bcrypt = require("bcrypt")

const ellenőrzés = async (username, password, done) => {
    const felhasznalo = await Felhasználó.findOne({email: username})
    
    if(!felhasznalo) {
      return done(null,false, { message: "A megadott email nincs regisztrálva!"})
    }

    bcrypt.compare(password, felhasznalo.jelszó).then( match => {
      if(match) {
        return done(null, felhasznalo, { message: "Bejelentkezve."})
      }
      
      return done(null, false, { message: "Hibás jelszó.", email: username })
      }).catch(err => {
        console.log(err)
        return done(null, false, { message: "Hiba"})
      })
    }
  
  function inicializálás(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: "jelszo" }, ellenőrzés))
  
    passport.serializeUser((user, done) => {
      done(null, user._id)
    })
  
    passport.deserializeUser((id, done) => {
      Felhasználó.findById(id, (err, user) => {
          done(err, user)
      })
    })
  }
  
  module.exports = { inicializálás }