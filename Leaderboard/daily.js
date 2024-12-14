//things to make it work 

//endpoints 
const etcusd = 'https://clock.imamkatz.com/ETCUSD'
const lastevent = 'https://clock.imamkatz.com/lastevents'
const ethResol = 'https://clock.imamkatz.com/address/'

// Function to toggle visibility
function toggleVisibility(id, lookupTable) {
    var element = document.getElementById(id);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
        replaceAddresses(element, lookupTable);
    } else {
        element.style.display = 'none';
    }
}

//get the data
fetch(etcusd)
    .then(response => response.json())
    .then(data => {
        var currentETCValue = data["ethereum-classic"].usd;
        currentETCValue = currentETCValue.toFixed(2);
        document.getElementById('etc-price').innerHTML = currentETCValue;
    })
    .catch(error => console.error('Error fetching data:', error));

fetch(lastevent)
    .then(response => response.json())
    .then(data => {
        var lastEvent = data;
        var bobThings = lastEvent.bob.map(event => event);
        var slagThings = lastEvent.slag.map(event => event);
        var greaseThings = lastEvent.grease.map(event => event);
        var inkThings = lastEvent.ink.map(event => event);

        // Collect all 'to' values and ensure they are unique
        var enstoresolv = [
            ...bobThings.map(event => event.to),
            ...slagThings.map(event => event.to),
            ...greaseThings.map(event => event.to),
            ...inkThings.map(event => event.to)
        ];

        // Create a Set to ensure unique entries
        var uniqueEnstoresolv = [...new Set(enstoresolv)];

        // Populate the lookupTable with unique entries
        var lookupTable = {};
        var fetchPromises = uniqueEnstoresolv.map(entry => {
            return fetch(ethResol + entry)
                .then(response => response.json())
                .then(data => {
                    lookupTable[entry] = data;
                })
                .catch(error => console.error('Error fetching data:', error));
        });

        // Wait for all fetches to complete
        Promise.all(fetchPromises).then(() => {
            // Update transaction counts and toggle button visibility
            updateTransactionSection('bob', bobThings, lookupTable);
            updateTransactionSection('slag', slagThings, lookupTable);
            updateTransactionSection('grease', greaseThings, lookupTable);
            updateTransactionSection('ink', inkThings, lookupTable);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function updateTransactionSection(section, transactions, lookupTable) {
    var countElement = document.getElementById(section + '-count');
    var toggleButton = document.getElementById(section + '-toggle');
    var contentElement = document.getElementById('last-event-' + section);

    if (transactions.length >= 1) {
        countElement.innerHTML = '(' + transactions.length + ')';
        toggleButton.style.display = 'inline';
        transactions.forEach(element => {
            var transaction_hash = element.transaction_hash;
            var toAddress = element.to;
            var resolvedAddress = lookupTable[toAddress] || toAddress;
            var UrlHash = 'https://etc.blockscout.com/tx/' + transaction_hash;
            contentElement.innerHTML += '<a href=' + UrlHash + '> ' + section.charAt(0).toUpperCase() + section.slice(1) + ' Transaction  </a><br>';
        });
    } else {
        countElement.innerHTML = '(0)';
        toggleButton.style.display = 'none';
    }
}

function replaceAddresses(element, lookupTable) {
    Object.keys(lookupTable).forEach(toAddress => {
        var resolvedAddress = lookupTable[toAddress];
        var elements = element.querySelectorAll(`a[href*="${toAddress}"]`);
        elements.forEach(link => {
            link.innerHTML = link.innerHTML.replace(toAddress, resolvedAddress);
        });
    });
}
