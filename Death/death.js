

const apiReso = 'https://api.tmwstw.io/get_ens@' //ens resolv returns a nice text
const apiUrl = 'https://api.tmwstw.io/game_death_list'; // death faucet tap that ~ !
const inputBox = document.getElementById("walletkdr");
const button = document.getElementById("button")
button.style.display = 'none';
inputBox.style.display = 'none'
const causeOfDeath =
    [
        'lack of skill basically',
        'Fucked too hard by robot',
        'Yesss',
        'Narwhal laser attack',
        'skill ?',
        'stepped on a lego',
        'tooo much strap',
        'drown in salty tears',
        'F A F O',
        'had it on safety',
        'whipped it out tooo slow',
        'dummy just stood there',
        'sheeeeeeeeeeeeiiiiitt',
        'burgers on you next time',
        'homey dont play dat',
        'got got ',
        'don got',
        'heard a whistling in the distance',
        'got ghosted',
        'the count was wrong ',
        '1st loser',
        'wasnt first... clearly lost',
        'Hit it on the first try',
        'Peep the slow cutter',
        'went pop like snot bubbles',
    ]
// testdata = [
//     {
//         "victim": "0xfac6b91421ebe1cc176cd50b8458de833fe1720e",
//         "killer": "0x7c835cae29c697deee286648aaadecec1cc9a99d",
//         "date": "23.03:21:56"
//     },
//     {
//         "victim": "0x7c835cae29c697deee286648aaadecec1cc9a99d",
//         "killer": "0xfac6b91421ebe1cc176cd50b8458de833fe1720e",
//         "date": "23.03:20:23"
//     },
//     {
//         "victim": "0xfac6b91421ebe1cc176cd50b8458de833fe1720e",
//         "killer": "0x7c835cae29c697deee286648aaadecec1cc9a99d",
//         "date": "23.03:18:36"
//     }
// ]
async function getDeathApi() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.reverse()
}

async function walletRes(wallet_id) {
    const response = await fetch(apiReso + wallet_id);
    const data = await response.text();

    return data.toLocaleUpperCase() //MFDOOM! ALL CAPS
}

function mostOccurringElement(array) {
    var max = array[0],
        counter = {},
        i = array.length,
        element;

    while (i--) {
        element = array[i];
        if (!counter[element]) counter[element] = 0;
        counter[element]++;
        if (counter[max] < counter[element]) max = element;
    }
    return max;
}

function firstLoser(array) {
    const map = array.reduce((acc, val) => {
        if (acc.has(val)) {
            acc.set(val, acc.get(val) + 1);
        } else {
            acc.set(val, 1);
        };
        return acc;
    }, new Map);
    const frequencyArray = Array.from(map);
    return frequencyArray.sort((a, b) => {
        return b[1] - a[1];
    })[1][0];
};

async function setPage() {
    const fixed_list = await getDeathApi()
    if (fixed_list.length == 0) { totdeaths.innerText = `no deaths bullets are FREE? api reset` }
    else {
        totdeaths.innerText = `${fixed_list.length}`
        //console.log(fixed_list)
        const killerlist = []
        const viclist = []
        for (let i = 0; i < fixed_list.length; i++) {
            let words = causeOfDeath[Math.floor(Math.random() * causeOfDeath.length)];
            kdr.innerHTML += "."
            kdr.style.color = 'red'
            let vic = await walletRes((fixed_list[i].victim))
            let killer = await walletRes((fixed_list[i].killer))
            killerlist.push(killer)
            viclist.push(vic)
            plotter.innerHTML += `<h2>Victim- ` + vic + ':  ' + words + `</h2>` + `<h4>died on ` + fixed_list[i].date + ` local game time  </h4>` + `<h2>Killer- ` + killer + ': slinging that chopper' + `</h2><hr>`
        }
        podium.innerHTML = `<h2> + Most kills  : ` + mostOccurringElement(killerlist) + ` - 1st loser : ` + firstLoser(killerlist) + ` -- Most deaths : ` + mostOccurringElement(viclist) + `</h2>`

    }

    kdr.innerHTML = ''
    kdr.style.color = 'blue'
    inputBox.style.display = 'block'
    button.style.display = 'block'
}

button.addEventListener("click", function () {
    const textBox = inputBox.value.toLocaleUpperCase();
    const Ksearch = new RegExp('Killer- ' + textBox, 'gi');
    const Vsearch = new RegExp('Victim- ' + textBox, 'gi');
    try {
        kRatio = document.querySelector("#plotter").textContent.match(Ksearch).length
        dRatio = document.querySelector("#plotter").textContent.match(Vsearch).length
        let kdRatio = (kRatio / dRatio).toFixed(3);
        kdr.innerHTML = `<h3>` + textBox + "  kdr: " + kRatio + " / " + dRatio + " = " + kdRatio + `</h3>`
        kdr.style.color = 'blue'
    } catch (error) {
        kdr.innerHTML = `<h3>WTF Omar got that fool last week ? ......not on this list  </h3>`
        kdr.style.color = 'red'
    }
})

setPage()
async function setPage() {
    const fixed_list = await getDeathApi()
    if (fixed_list.length == 0) { totdeaths.innerText = `no deaths bullets are FREE? api reset` }
    else {
        totdeaths.innerText = `${fixed_list.length}`
        //console.log(fixed_list)
        const killerlist = []
        const viclist = []
        for (let i = 0; i < fixed_list.length; i++) {
            let words = causeOfDeath[Math.floor(Math.random() * causeOfDeath.length)];
            kdr.innerHTML += "."
            kdr.style.color = 'red'
            let vic = await walletRes((fixed_list[i].victim))
            let killer = await walletRes((fixed_list[i].killer))
            killerlist.push(killer)
            viclist.push(vic)
            plotter.innerHTML += `<h2>Victim- ` + vic + ':  ' + words + `</h2>` + `<h4>died on ` + fixed_list[i].date + ` local game time  </h4>` + `<h2>Killer- ` + killer + ': slinging that chopper' + `</h2><hr>`
        }
        podium.innerHTML = `<h2> + Most kills  : ` + mostOccurringElement(killerlist) + ` - 1st loser : ` + firstLoser(killerlist) + ` -- Most deaths : ` + mostOccurringElement(viclist) + `</h2>`

    }

    kdr.innerHTML = ''
    kdr.style.color = 'blue'
    inputBox.style.display = 'block'
    button.style.display = 'block'
}
let kRatio = 0
let dRatio = 0

button.addEventListener("click", function () {
    const textBox = inputBox.value.toLocaleUpperCase();
    const Ksearch = new RegExp('Killer- ' + textBox, 'gi');
    const Vsearch = new RegExp('Victim- ' + textBox, 'gi');
    try {
        kRatio = document.querySelector("#plotter").textContent.match(Ksearch).length
        dRatio = document.querySelector("#plotter").textContent.match(Vsearch).length
        let kdRatio = (kRatio / dRatio).toFixed(3);
        kdr.innerHTML = `<h3>` + textBox + "  kdr: " + kRatio + " / " + dRatio + " = " + kdRatio + `</h3>`
        kdr.style.color = 'blue'
    } catch (error) {
        kdr.innerHTML = `<h3>WTF Omar got that fool last week ? ......not on this list  </h3>`
        kdr.style.color = 'red'
    }
})
setPage()

