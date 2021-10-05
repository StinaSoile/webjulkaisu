"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen leimaamat rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin
// voit vapaasti luoda data-rakenteen pohjalta omia aputietorakenteita

// Kirjoita tästä eteenpäin oma ohjelmakoodisi

// Valmista log-funktiota ajetaan seuraavasti:
// let Testi = 'Testi!';
// log(Testi); Tulostaa "olionsa" sisällön sivulle.

// Tulostaa data-objektin sisältämien joukkueiden nimet ja sarjat.
// Joukkueen nimen mukaan aakkosjärjestykseen. Joukkueen nimi tulostuu ensin jonka jälkeen sarjan nimi.
// Jokainen joukkue muodostaa oman rivinsä.
// Isot ja pienet kirjaimet ovat saman arvoisia.
// Välilyönneillä alussa ja lopussa ei ole merkitystä järjestykseen eikä niitä tulosteta.
function tulostaJoukkueet(data) {
    let kopioJoukkueista = Array.from(data['joukkueet']); //shallow kopio älä muuta tietoja.
    // Hoitaa järjestämisen aakkosjärjestykseen nimen perusteella yllä olevilla vaatimuksilla
    kopioJoukkueista.sort(function(a, b){ 
        let nimiA = a.nimi.toUpperCase().trim();
        let nimiB = b.nimi.toUpperCase().trim();
        if (nimiA < nimiB) {return -1;}
        if (nimiA > nimiB) {return 1;}
        return 0;
    });
    // tulostus silmukka.
    // Heittää jotain ihme herjaa jos ei sijoita välilyöntiä muuttajaan.
    // Toisella koneella ei antanut. Tulee ilmeisesti jostain VSCode laajennuksesta???
    // Ainakin netin mukaan??? Tulee ilmeisesti html-validate laajennuksesta.
    for(let i=0, vali=' '; i<kopioJoukkueista.length; i++) {
        log(kopioJoukkueista[i].nimi.trim()+vali+kopioJoukkueista[i].sarja.nimi.trim());
    }
}

/**
 * Lisää uuden joukkueen dataan
 * asettaa samalla joukkueen sarjaksi parametrina tuodun sarjan.
 * Sarjan on löydyttävä data-objektin sarja-objektista.
 * Jos jokin parametri puuttuu, funktio ei tee mitään.
 * Palauttaa muuttuneen datan.
 * Parametrit ovat kaikki objecteja.
 * @param {Object} data
 * @param {Object} joukkue
 * @param {Object} sarja
 */
function lisaaJoukkue(data, joukkue, sarja) {
    // Testaus parametreille
    if (!(data && joukkue && sarja)) {return;}
    let falidiusTesti = false;
    for (let i=0; i<data.sarjat.length; i++){
        falidiusTesti = data.sarjat[i] === sarja;
        if(falidiusTesti) {break;}
    }
    if (!falidiusTesti) {return;}
    // Muutetaan joukkue parametriin annettu sarja
    joukkue.sarja = sarja;
    // Lisätään uusi joukkue dataan
    data.joukkueet.push(joukkue);
    return data;
}

/**
 * Etsii kysytyn sarjan viitteen ja palauttaa sen.
 * @param {Object} data 
 * @param {String} etsittava 
 * @returns Undefined jos sarjaa ei lödetty muuten palautetaan etsittävä sarja 
 */
function etsiSarja(data, etsittava){
    return data.sarjat.find(sarja => sarja.nimi === etsittava);
}

/**
 * Vaihtaa sarjan nimeä sarjat-objektissa.
 * Vaatii kaikki parametrit ja niissä on oltava jotain:
 * 0, tyhjä merkkijono, NaN, null ja undefined ovat kiellettyjä sekä
 * vanhanimi pitää olla vastaava data sarjat taulukosta löytyvään nimeen.
 * @param {Object} data
 * @param {String} vanhanimi 
 * @param {String} uusinimi 
 */
function muutaSarjanNimi(data, vanhanimi, uusinimi) {
    // Testaus parametreille
    if (!(data && vanhanimi && uusinimi)) {return;}
    let validiusTesti = false;
    let indeksi = 0;
    for (; indeksi<data.sarjat.length; indeksi++){
        validiusTesti = data.sarjat[indeksi].nimi === vanhanimi;
        if(validiusTesti) {break;}
    }
    if (!validiusTesti) {return;}
    data.sarjat[indeksi].nimi = uusinimi;
}

/**
 * Tulostaa kaikkien rastien koodit jotka alkavat kokonaisluvulla samalle riville.
 * Välieroittimena käytetään puolipistettä ;
 * Jos data ei sisällä rastit ominaisuutta ei tehdä mitään.
 * @param {Object} data
 */
function tulostaRastienKoodit(data) {
    if (!("rastit" in data)) {return;}
    let kopioRasteista = Array.from(data['rastit']);
    kopioRasteista.sort(function(a, b){ 
        let nimiA = a.koodi.toUpperCase();
        let nimiB = b.koodi.toUpperCase();
        if (nimiA < nimiB) {return -1;}
        if (nimiA > nimiB) {return 1;}
        return 0;
    });
    let tulostus = [];
    for (let i=0; i<kopioRasteista.length; i++) {
        if (parseInt(kopioRasteista[i].koodi)) {
            tulostus.push(kopioRasteista[i].koodi);
        }
    }
    log('\n' + tulostus.join(';') + ';');
}

// TASO3--------------------------------------------------------------------
/**
 * Poistaa annetun nimisen joukkueen data-rakenteesta jos sellainen löytyy.
 * Poiston on case-sensitiivinen mutta välilyöntejä alussa ja lopussa ei huomioida
 * @param {Object} data
 * @param {String} pJoukkue mikä poistetaan
 * @returns undefined jos joukkueen poisto ei onnistu muuten palauttaa poistetun joukkueen
 */
function poistaJoukkue(data, pJoukkue){
    if(!(data && pJoukkue)) {return undefined;}
    let poistettava = pJoukkue.trim(); 
    let kopioJoukkueista = Array.from(data['joukkueet']);
    let indeksi = kopioJoukkueista.findIndex(joukkue => joukkue.nimi.trim() === poistettava);
    if (indeksi < 0) {return undefined;}
    let poistettu = kopioJoukkueista.splice(indeksi, 1);
    data.joukkueet = kopioJoukkueista;
    return poistettu;
}

/**
 * Etsii joukkueen datasta nimen perusteella. Palauttaa joukkueen viitteen.
 * Etsintä on case-sensitiivinen, välilyönnit alussa ja lopussa ei vaikuta tulokseen
 * @param {Object} data 
 * @param {String} etsittava joukkue
 * @returns undefined jos joukkuetta ei löydy
 */
function etsiJoukkue(data, etsittava){
    return data.joukkueet.find(joukkue => joukkue.nimi.trim() === etsittava.trim());
}

/**
 * Etsii joukkueelta parametrina annettavaa rastin koodin mukaisen rastin paikan
 * Joukkueen rastit-taulukosta. Palauttaa kyseisen indeksin.
 * @param {Object} joukkue 
 * @param {String} etsittavaRasti 
 * @returns Rastin indeksin tai -1 jos rastia ei löydy.
 */
function etsiRastinIdxJoukkueelta(joukkue, etsittavaRasti){
    let rastit = joukkue.rastit;
    let loydettyIdx = -1;
    for (let i=0; i<rastit.length; i++){
        if (rastit[i].rasti !== (undefined)) {
            if (rastit[i].rasti === '0') {continue;}
            if (rastit[i].rasti.koodi === etsittavaRasti) {
                loydettyIdx = i;
                break;
            }
        }
    }
    return loydettyIdx;
}

/**
 * Etsii rastin objectin viitteen annetulla koodilla
 * @param {*} data 
 * @param {*} etsittava koodi
 * @returns Rastin objectin-viitteen
 */
function etsiRasti(data, etsittava){
    return data.rastit.find(rasti => rasti.koodi === etsittava);
}


/**
 * Vaihtaa pyydetyn rastileimauksen sijalle uuden rastin ja ajan rastille
 * @param {Object} joukkue
 * @param {number} rastinIdx - rastin paikka joukkue.rastit-taulukossa
 * @param {Object} uusirasti
 * @param {string} Aika - Rastileimauksen aika. Jos tätä ei anneta, käytetään samaa aikaa kuin vanhassa korvattavassa leimauksessa
 * @return undefined jos lisäys ei onnistu muuten palautetaan joukkue jota muutos koskee
 */
function vaihdaRasti(joukkue, rastinIdx, uusirasti, aika) {
    if(!(joukkue && rastinIdx > -1 && uusirasti)) {return undefined;}
    if (0 > (data.rastit.findIndex(rasti => rasti === uusirasti))) {return undefined;}
    if (joukkue.rastit.length < rastinIdx || rastinIdx < 0) {return undefined;}
    joukkue.rastit[rastinIdx].rasti = uusirasti;
    if (!(Date.parse(aika))) {return joukkue;}
    joukkue.rastit[rastinIdx].aika = aika;
    return joukkue;
}

/**
 * Suodattaa epäkelvot rastit aineistosta
 * @param {Object} kRasti 
 * @returns validin rastin joka lasketaan pisteisiin
 */
function pisteLaskunSuodatus(kRasti) {
    if (!(kRasti.rasti)) {return false;}
    if (!(kRasti.rasti.koodi)) {return false;}
    let kKoodi = kRasti.rasti.koodi;
    switch (kKoodi) {
        case "LAHTO":
        case "MAALI":
            return true;
        default:
            if (parseInt(kKoodi)) {return true;}
            return false;
    }
}

/**
 * Laskee joukkueen pisteet rasteilta. Pisteisiin lasketaan vain kokonailuvulla alkavat,
 * jotka ovat viimeisimmän LAHTO ja ensimmäisen MAALI leimauksen välissä. Samasta rastista
 * voi saada pisteet vain kerran.
 * @param {Object} joukkue 
 * @returns pisteet joukkueelta
 */
function laskePisteet(joukkue) {
    let pisteet = 0;
    let kaydytRastit = joukkue.rastit.filter(pisteLaskunSuodatus);
    kaydytRastit.sort(function(a, b) {
        let aikaA = a.aika;
        let aikaB = b.aika;
        if (aikaA < aikaB) {return -1;}
        if (aikaA > aikaB) {return 1;}
        return 0;
    });
    let lahto = etsiRasti(data, "LAHTO");
    let maali = etsiRasti(data, "MAALI");
    let lasketut = [];
    let lahtoIdx = -1;
    let maaliIdx = -1;
    for (let i=0, j=kaydytRastit.length-1; i<j; i++, j-- ) {
        if (kaydytRastit[i].rasti === lahto) {lahtoIdx=i;}
        if (kaydytRastit[j].rasti === maali) {maaliIdx=j;}
    }
    for (let i=lahtoIdx+1, kRasti; i<maaliIdx; i++) {
        kRasti = kaydytRastit[i].rasti;
        if (lasketut.includes(kRasti)) {continue;}
        pisteet = pisteet + parseInt(kRasti.koodi[0]);
        lasketut.push(kRasti);
    }
    return pisteet;
}

/**
 * Tulostaa joukkueiden tulokset pistejärjestykseen kunkin joukkueen omalle rivilleen ja
 * palauttaa taulukon jossa on nimet ja pisteet
 * @param {Object} data mikä aineisto käsitellään
 * @return taulukko
 */
function tulostaTulokset(data) {
    let kJoukkueet = Array.from(data.joukkueet);
    let tulokset = [];
    kJoukkueet.forEach(joukkue => tulokset.push([joukkue.nimi.trim(), laskePisteet(joukkue)]));
    tulokset.sort(function(a, b) {
        let pisteetA = a[1];
        let pisteetB = b[1];
        if (pisteetA < pisteetB) {return 1;}
        if (pisteetA > pisteetB) {return -1;}
        let nimiA = a[0].toUpperCase();
        let nimiB = b[0].toUpperCase();
        if (nimiA < nimiB) {return -1;}
        if (nimiA > nimiB) {return 1;}
        return 0;
    });
    tulokset.forEach(joukkue => log(joukkue.join(' (') + ' p)'));
    return tulokset;
}

//--------------------------------------------------------------------------

let mallij = { 
    "nimi": "Mallijoukkue",
    "jasenet": [
      "Lammi Tohtonen",
      "Matti Meikäläinen"
    ],
    "leimaustapa": [0,2],
    "rastit": [],
    "sarja": undefined,//tämä asetetaan funktiossa oikeaksi
    "id": 99999
};
let mihinSarjaan = etsiSarja(data, "8h");
lisaaJoukkue(data, mallij, mihinSarjaan );
muutaSarjanNimi(data, "8h", "10h");
tulostaJoukkueet(data);
tulostaRastienKoodit(data);

//TASO3-------------------------------------------------------------------------

poistaJoukkue(data, 'Vara 1');
poistaJoukkue(data, 'Vara 2');
poistaJoukkue(data, 'Vapaat');

let joukkueDuo = etsiJoukkue(data, 'Dynamic Duo');
let vaihdettavanIdx = etsiRastinIdxJoukkueelta(joukkueDuo, '93'); 
let uusirasti = etsiRasti(data, '32');
let aika = "";
vaihdaRasti(joukkueDuo, vaihdettavanIdx, uusirasti, aika);

log('\n----------\nTaso 3\n----------\n');

let tulokset = tulostaTulokset(data);

//TASO5-------------------------------------------------------------------------


//log('\n----------\nTaso 5\n----------\n');


// Seuraavilla voit tutkia selaimen konsolissa käytössäsi olevaa tietorakennetta. 

console.log(data);

console.dir(data);

console.log(document.head);
console.log(document.body);
