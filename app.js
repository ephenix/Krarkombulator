const krarkImg         = document.getElementById("krark-img");
const thumbImg         = document.getElementById("thumb-img");
const birgiImg         = document.getElementById("birgi-img");
const scoundrelImg     = document.getElementById("scoundrel-img");
const artistImg        = document.getElementById("artist-img");
const redImg           = document.getElementById("red-img");
const blueImg          = document.getElementById("blue-img");
const treasureImg      = document.getElementById("treasure-img");
const stormImg         = document.getElementById("storm-img");

const krarkCounter     = document.getElementById("krark-counter");
const thumbCounter     = document.getElementById("thumb-counter");
const birgiCounter     = document.getElementById("birgi-counter");
const scoundrelCounter = document.getElementById("scoundrel-counter");
const artistCounter    = document.getElementById("artist-counter");
const redCounter       = document.getElementById("red-counter");
const blueCounter      = document.getElementById("blue-counter");
const treasureCounter  = document.getElementById("treasure-counter");
const stormCounter     = document.getElementById("storm-counter");

const riteImg          = document.getElementById("rite-img");
const pyreticImg       = document.getElementById("pyretic-img");
const seethingImg      = document.getElementById("seething-img");
const trickeryImg      = document.getElementById("trickery-img");
const optImg           = document.getElementById("opt-img");
const counterspellImg  = document.getElementById("counterspell-img");

const stackDiv         = document.getElementById("stack");
const resolveButton    = document.getElementById("resolve");
const copyButton       = document.getElementById("copy");
const bounceButton     = document.getElementById("bounce");

resolveButton.addEventListener("click", resolveStackEntry);
copyButton.addEventListener("click", copySpell);
bounceButton.addEventListener("click", bounceSpell);


const headsCounter     = document.getElementById("heads-counter");
const tailsCounter     = document.getElementById("tails-counter");

const stackElements    = [];

const logP              = document.getElementById("log");
const logDiv              = document.getElementById("log-div");

const board = {
    krark: {
        img: krarkImg,
        counter: krarkCounter,
        qty: 0
    },
    thumb: {
        img: thumbImg,
        counter: thumbCounter,
        qty: 0
    },
    birgi: {
        img: birgiImg,
        counter: birgiCounter,
        qty: 0
    },
    scoundrel: {
        img: scoundrelImg,
        counter: scoundrelCounter,
        qty: 0
    },
    artist: {
        img: artistImg,
        counter: artistCounter,
        qty: 0
    },
    red: {
        img: redImg,
        counter: redCounter,
        qty: 0
    },
    blue: {
        img: blueImg,
        counter: blueCounter,
        qty: 0
    },
    treasure: {
        img: treasureImg,
        counter: treasureCounter,
        qty: 0
    },
    storm: {
        img: stormImg,
        counter: stormCounter,
        qty: 0
    }
};

const spells = {
    rite: {
        img: riteImg,
        name: "Rite of Flame",
        cost: {
            r:1,
            u:0,
            c:0
        }
    },
    pyretic: {
        img: pyreticImg,
        name: "Pyretic Ritual",
        cost: {
            r:1,
            u:0,
            c:1
        }
    },
    seething: {
        img: seethingImg,
        name: "Seething Song",
        cost: {
            r:1,
            u:0,
            c:2
        }
    },
    trickery: {
        img: trickeryImg,
        name: "Tibalt's Trickery",
        cost: {
            r:1,
            u:0,
            c:1
        }
    },
    opt: {
        img: optImg,
        name: "Opt",
        cost: {
            r:0,
            u:1,
            c:0
        }
    },
    counterspell: {
        img: counterspellImg,
        name: "Counterspell",
        cost: {
            r:0,
            u:2,
            c:0
        }
    }
};

for (const spell in spells) {
    spells[spell]['img'].key=spell;
    spells[spell]['img'].addEventListener("click",castSpell);
}

for (const key in board) {
    board[key]["img"].key = key;
    board[key]["counter"].key = key;
    board[key]["img"].addEventListener("click", addOne);
    board[key]["counter"].addEventListener("click", removeOne);
}

function log(msg) {
    logP.innerText += `\n${msg}`;
    logDiv.scrollTop     = logDiv.scrollHeight;
    console.log(msg);
}

function addOne(evt) {
    let key = evt.currentTarget.key;
    log(`Add one ${key}.`)
    board[key]['qty']++;
    board[key]['counter'].innerText = board[key]['qty'];
}

function removeOne(evt) {
    let key = evt.currentTarget.key;
    log(`Removed one ${key}.`)
    board[key]['qty']--;
    board[key]['counter'].innerText = board[key]['qty'];
}

function castSpell(evt) {
    let key = evt.currentTarget.key;
    log(`Cast ${spells[key]['name']}`);
    board["storm"]["qty"]++;
    board["storm"]['counter'].innerText = board["storm"]['qty'];
    board["red"]["qty"] -= spells[key]['cost']['r'];
    board["blue"]["qty"] -= spells[key]['cost']['u'];
    board["red"]["qty"] -= spells[key]['cost']['c'];
    board['red']['counter'].innerText = board["red"]["qty"];
    board['blue']['counter'].innerText = board["blue"]["qty"];

    let e = createStackEntry(key);
    for (let i = 0; i < board["krark"]['qty']; i++){
        createStackEntry("krark",e);
    }
    for (let i = 0; i < board["birgi"]['qty']; i++){
        createStackEntry("birgi",e);
    }
    for (let i = 0; i < board["artist"]['qty']; i++){
        createStackEntry("artist",e);
    }
}

function createStackEntry(key, rel=null, copy=false) {
    let e = document.createElement("img");
    if (rel) {
        e.src = board[key]['img'].src;
        e.rel = rel;
        let name = `${key}(${spells[rel.key]['name']})`;
        e.token = name
        log(`Add ${name} trigger to stack.`)
    }
    else {
        let name = spells[key]['name'];
        e.src    = spells[key]['img'].src;
        log.innerText+=`\nAdd ${name} to stack.`
    }
    e.key = key;
    e.className = "img-fluid"
    stackElements.push(e);
    stackDiv.appendChild(e);
    stackDiv.scrollTop     = stackDiv.scrollHeight;
    return e;
}

function resolveStackEntry() {
    if(stackElements.length) {
        let e = stackElements[stackElements.length-1];

        if(e.key=="krark"){
            resolveKrark(e);
        }
        if(e.key=='rite'){
            resolveRitual(e,2);
        }
        if(e.key=='pyretic'){
            resolveRitual(e,3);
        }
        if(e.key=='song'){
            resolveRitual(e,5);
        }
        if(e.key=="birgi"){
            resolveBirgi(e);
        }
        if(e.key=="scoundrel"){
            resolveScoundrel(e);
        }
        if(e.key=="artist"){
            resolveArtist(e);
        }
    }
    stackDiv.scrollTop     = stackDiv.scrollHeight;
}

function copySpell() {
    let e = stackElements.pop();
    let name = spells[e.rel.key]['name'];
    log(`Resolved Krark Trigger copying ${name}`);
    createStackEntry(e.rel.key, rel=null, copy=true);
    for (let i = 0; i < board["artist"]['qty']; i++){
        createStackEntry("artist",e.rel);
    }
    for (let i = 0; i < board["scoundrel"]['qty']; i++){
        createStackEntry("scoundrel",e.rel);
    }
    resolveButton.disabled=false;
    copyButton.disabled=true;
    bounceButton.disabled=true;
    e.remove();
}

function bounceSpell() {
    let e = stackElements.pop();
    let name = spells[e.rel.key]['name'];
    log(`Resolving Krark Trigger Bouncing ${name} from the stack`);
    if(!e.rel.countered){
        e.rel.countered = true;
        stackDiv.removeChild(e.rel);
        stackDiv.scrollTop     = stackDiv.scrollHeight;
    }
    resolveButton.disabled=false;
    copyButton.disabled=true;
    bounceButton.disabled=true;
    e.remove();
}

function resolveKrark(e) {
    let coins = 2**board['thumb']['qty'];
    let flips = {
        h: 0,
        t: 0
    }
    for(let i = 0; i < coins; i++) {
        if (Math.floor(Math.random() * 2) == 0) {
            flips['h']++;
        }
        else {
            flips['t']++;
        }
    }
    headsCounter.innerText = flips['h'];
    tailsCounter.innerText = flips['t'];
    log(`Flipped ${coins} coins resulting in ${flips['h']} heads and ${flips['t']} tails.`)
    if(flips['h'] && flips['t']){
        resolveButton.disabled=true;
        copyButton.disabled=false;
        bounceButton.disabled=false;
        log(`Choice: Copy or Bounce?`);
    }
    else if (flips['h']) {
        log(`All heads. Forced Copy.`)
        copySpell()
    }
    else {
        log(`All Tails. Forced Bounce.`)
        bounceSpell()
    }
}

function resolveBirgi(e){
    board['red']['qty']++;
    board['red']['counter'].innerText = board['red']['qty'];
    log("+1 R - Resolved Birgi Trigger");
    stackElements.pop();
    e.remove();
}
function resolveArtist(e){
    board['treasure']['qty']++;
    board['treasure']['counter'].innerText = board['treasure']['qty'];
    log("+1 Treasure - Resolved Storm-Kiln Artist Trigger.");
    stackElements.pop();
    e.remove();
}
function resolveScoundrel(e){
    board['treasure']['qty']+=2;
    board['treasure']['counter'].innerText = board['treasure']['qty'];
    log("+2 Treasure - Resolved Tavern Scoundrel Trigger.");
    stackElements.pop();
    e.remove();
}
function resolveRitual(e,v){
    if (!e.countered){
        board['red']['qty']+=v;
        board['red']['counter'].innerText = board['red']['qty'];
        log(`+${v} R - Resolved ${e.key}.`);
        stackElements.pop();
        e.remove();
    }
    else{
        stackElements.pop();
        log(`${e.key} was bounced; nothing to resolve`);
    }
}