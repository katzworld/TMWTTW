const SufferapiUrl = `https://api.imamkatz.com/check?suffer=`
const JourneyapiUrl = `https://api.imamkatz.com/journey?session=`
const ResourceapiUrl = `https://api.imamkatz.com/faucet/`

const inputBox = document.getElementById("wallet_ID");
const button = document.getElementById("button")
let radio = document.getElementById('output')
inputBox.value = "wallet.eth";



async function getSuffer(suffer) {
    const response = await fetch(SufferapiUrl + suffer);
    const data = await response.json();
    return data
}



async function getResource(plota) {
    console.log('hey')
    const response = await fetch(ResourceapiUrl + plota)
    const data = await response.json();
    console.log(data)
    return data
}


function millisecondsToMinutesAndSeconds(milliseconds) {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = milliseconds % 60000 / 1000;
    return minutes + " minutes and " + seconds + " seconds";
}




async function getJourney(session) {
    const response = await fetch(JourneyapiUrl + session);
    const journeyLog = await response.json();
    const timestamp1 = new Date(journeyLog[0].timestamp);
    const timestamp2 = new Date(journeyLog[journeyLog.length - 1].timestamp);
    const difference = timestamp2 - timestamp1;
    let runTime = millisecondsToMinutesAndSeconds(difference)

    output.innerHTML = `
    <a href="${JourneyapiUrl + session}" target="_blank">Click here for session information from api</a>
    <div class='top'><h2>run for ${journeyLog[0].suffer} ${journeyLog.length - 1} with plat <br>
    </h2> RunTime : ${runTime} from ${journeyLog[0].plota} to ${journeyLog[journeyLog.length - 1].plota}<br>
    Lifetime: ${journeyLog[journeyLog.length - 1].lifetime_plotas}
    </div>`
    journeyLog.forEach(element => {
        const localDateTime = new Date(element.timestamp);
        const localDateTimeString = localDateTime.toLocaleString();

        output.innerHTML += `<div class='plat'><h3><img src="https://meta.tmwstw.io/preview_plots_${element.plota}.jpg" width="150" height="150"> 
        <br>
         SES : ${element.check} WHEN: ${localDateTimeString}</h3></div>`
    })
}

async function setSuffer(suffer_ID) {
    const fixed_list = await getSuffer(suffer_ID)
    output.innerHTML = `<a href="${SufferapiUrl + suffer_ID}" target="_blank">Click here for Suffer id from api</a>`
    fixed_list.forEach((element, i) => {
        output.innerHTML += `
        <h2><class id=${i}> session${i} <input type="radio" name=${element.session} id=${i}></span></h2>`
        //console.log(element.session)
    });
}

radio.addEventListener("click", function (event) {
    try {
        getJourney(event.target.name)
    } catch (error) {
        console.error(error)
    }
})

button.addEventListener("click", function () {
    try {
        if (inputBox.value == "wallet.eth") {
            output.innerHTML = 'errorr wallet.eth invalid please enter wallet id of suffer in world'
            return
        };
        output.innerHTML = ''
        const textBox = inputBox.value.toLocaleLowerCase();
        setSuffer(textBox)



    } catch (error) {
        console.error(error)
    }
})
