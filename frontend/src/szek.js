const container = document.querySelector('.container');
const ules = document.querySelectorAll('.sor .ules:not(.foglalt');
const count = document.getElementById('count');
const total = document.getElementById('total');
const filmValasztas = document.getElementById('film');
const küldésGomb = document.getElementById("küldés")
const rejtettCím = document.getElementById("filmCím")
const rejtettÁr = document.getElementById("filmÁr")
const rejtettSzékek = document.getElementById("rejtettSzékek")
const rejtettFoglaltSzékek = document.getElementById("foglaltSzékek")
const foglalásTörlés = document.getElementById("foglalás-törlés")
const rejtettFoglalások = document.getElementById("címFoglalás")
const rejtettId = document.getElementById("felhasználóId")
const rejtettMennyiség= document.getElementById("sok")
const címek = ["Pókember: Nincs hazaút (7€)", "Agymanók (5€)", "Pig (5€)", "1917 (7€)", "Hang Nélkül 2 (6€)", "Shang-Chi és a tíz gyűrű (7€)", "Raya (5€)", "Idő (6€)"]

let jegyAr
let filmCím
let filmIndex = 0
let mennyiségTömb = []
let kivalasztottUlesek = []
let kivalasztottUlesekSzama = 0
let osszesKivlasztottUles
let valasztottUlesek
let valasztottFilmSzekek

const val = rejtettFoglaltSzékek.value
const valTömb = val.split(",")
const foglaltak = [];
while(valTömb.length) foglaltak.push(valTömb.splice(0,48));

küldésGomb.disabled = true
filmVáltoztatás(JSON.parse(filmValasztas.value))
rendelésnélFilmVáltoztatás()

container.addEventListener('click', (e) => clickListener(e));
filmValasztas.addEventListener('change', (e) => {
    const film = JSON.parse(e.target.value)
    filmVáltoztatás(film)
})


function updateSelectedCount() {
    valasztottUlesek = document.querySelectorAll('.sor .ules.kivalasztott')
    const ulesIndex = [...valasztottUlesek].map(function (seat) {
        return [...ules].indexOf(seat)
    })
    kivalasztottUlesek = ulesIndex
    
    rejtettSzékek.value = kivalasztottUlesek
    filmIndex = címek.indexOf(filmCím)
    valasztottFilmSzekek = foglaltak[filmIndex]
    foglaltSzékekMegjelenítés(valasztottFilmSzekek)
    törlésLétrehozás()
    
    mennyiségTömb = rejtettMennyiség.value.split(",")
    kivalasztottUlesekSzama = valasztottUlesek.length 
    osszesKivlasztottUles = document.querySelectorAll('.sor .ules.kivalasztott').length + document.querySelectorAll('.sor .ules.foglalt').length
  
    if (osszesKivlasztottUles > 8)  küldésGomb.disabled = true
    else if(kivalasztottUlesekSzama > 0) küldésGomb.disabled = false  
    else küldésGomb.disabled = true
    
    count.innerText = kivalasztottUlesekSzama;
    total.innerText = kivalasztottUlesekSzama * jegyAr;
}

function filmVáltoztatás(film) {
    valasztottUlesek = document.querySelectorAll('.sor .ules.kivalasztott')
    jegyAr = film.ár;
    filmCím = film.cím
    rejtettCím.value = filmCím
    rejtettÁr.value = jegyAr
    valasztottUlesek.forEach(ules => ules.classList.remove("kivalasztott"))
    updateSelectedCount()
}

function foglaltSzékekMegjelenítés(választott) {
    const szekDivek = document.querySelectorAll(".szek")
    for(i = 0; i < szekDivek.length; i++) {
        szekDivek[i].classList.remove("foglalt")
        if(választott[i] == "true") {
            szekDivek[i].classList.add("foglalt")
        }
    }
}

function törlésLétrehozás() {
    if(document.body.contains(document.getElementById("torol-szoveg"))) {
        foglalásTörlés.removeChild(document.getElementById("torol-szoveg"))
    }
    const val = rejtettFoglalások.value
    const valTömb = val.split(",")
    
    if(valTömb[filmIndex] == "true") {
        const töröl = document.createElement("a")
        töröl.innerText = "Foglalás törlése"
        töröl.setAttribute("href", `/torles?id=${rejtettId.value}&cím=${filmCím}`)
        töröl.setAttribute("id", "torol-szoveg")
        foglalásTörlés.appendChild(töröl)
    }
}

function rendelésnélFilmVáltoztatás() {
    const foglaltCím = document.getElementById("foglaltCím")
    if(foglaltCím.value != null) {
        document.getElementById("film").selectedIndex = parseInt(foglaltCím.value)
        foglaltSzékekMegjelenítés(foglaltak[document.getElementById("film").selectedIndex])
        törlésLétrehozás()
        osszesKivlasztottUles = document.querySelectorAll('.sor .ules.foglalt').length
    }
}

function clickListener(e) {
    if(osszesKivlasztottUles > 7 && !e.target.classList.contains('kivalasztott')) return
    

    if (e.target.classList.contains('ules') && !e.target.classList.contains('foglalt')) {
        e.target.classList.toggle('kivalasztott');
        updateSelectedCount();
    }
}


