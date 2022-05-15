const path = require("path")
const foglalás = require("../models/foglalás")
const címek = ["Pókember: Nincs hazaút (7€)", "Agymanók (5€)", "Pig (5€)", "1917 (7€)", "Hang Nélkül 2 (6€)", "Shang-Chi és a tíz gyűrű (7€)", "Raya (5€)", "Idő (6€)"]

const getSzek = async(req, res) => {
    const foglalások = await foglalás.find({})
    
    const nyersFelhasználóID = res.locals.user._id
    let átmenetiID = nyersFelhasználóID.toString().replace('new ObjectId("', "")
    let felhasználóID = átmenetiID.replace('")', "")

    let csoportosítottFoglalások = []
    for (i = 0; i < címek.length; i++) {
        let arr = []
        for(j = 0; j < 48; j++) {
            arr.push(false)
        }
        csoportosítottFoglalások.push(arr)
    }

    const felhasználóFoglalások = await foglalás.find({felhasználó: felhasználóID})
    const foglaltCímek = felhasználóFoglalások.map(foglalás => foglalás.film)
    const foglaltMennyiség = felhasználóFoglalások.map(foglalás => foglalás.székek.length)
    const vanFoglalva = []
    const foglalt = []

    for(i = 0; i < címek.length; i++) {
        vanFoglalva[i] = false
        foglalt[i] = 0
    }
    foglaltCímek.forEach((cím, i) => {
        const index = címek.indexOf(cím)
        vanFoglalva[index] = true
        foglalt[index] = foglaltMennyiség[i]
    })
   
    foglalások.forEach(foglalás => {
        let foglaltSzékek = foglalás.székek
        let címSzám = címek.indexOf(foglalás.film)

        foglaltSzékek.forEach(foglaltSzék => {
            let foglaltSzékSzám = parseInt(foglaltSzék)
            csoportosítottFoglalások[címSzám][foglaltSzékSzám] = true
        })
    })


    
    res.render("szek", { isSzek : true, vanFoglalva, csoportosítottFoglalások, nyersFelhasználóID, foglalt, title: "Foglalás", foglaltCím: null })
}

const foglalas = (req, res) => {
    const { filmCím, filmÁr, székek } = req.body
    console.log(filmÁr)
    const székekTömb = székek.split(",")

    const újFoglalás = new foglalás({
        film: filmCím,
        ár: filmÁr * székekTömb.length,
        székek: székekTömb,
        felhasználó: res.locals.user._id
       })

    újFoglalás.save().then( () =>{
        req.flash("foglaltCím", címek.indexOf(filmCím))
        console.log(címek.indexOf(filmCím))
        return res.redirect("/foglalas")
    })
    .catch(error => {
        console.log(error)
        return res.redirect("/foglalas")
    })   
}

const töröl = ((req, res) => {
    const { id, cím} = req.query
   
    foglalás.findOneAndDelete({felhasználóID: id, film: cím}, function(err, user) 
    {
       if (err)
       {    
           console.log(err)
           res.send(err);
       }
      else {
          res.redirect("/foglalas")
      }
   
    });
})

module.exports = {getSzek, foglalas, töröl}