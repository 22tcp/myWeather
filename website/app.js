/* Global Variables */
const owmapikey = "&appid=b9f1b31b3c30d0b246109a98fbdcde93";
const owmendpoint = "https://api.openweathermap.org/data/2.5/weather?zip="; 


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const queryWEB = async ( url = '' ) => {
    return await fetch(url, {
        method: 'GET',
    })
    .catch ( error => console.error(error));
}

const uploadTo = async ( url = '', data = {}) => { 
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const status = await response.json();
        return status;
    } catch  {
        console.log("error;", error);
    }

}

const manageData = (e) => {
    if ( document.getElementById('zip').value != '' ) {
    let userText = document.getElementById('feelings').value;
    let zipCode  = document.getElementById('zip').value;
    let APIQuery = owmendpoint + zipCode + owmapikey + '&units=metric';
    //console.log("generated query: " + APIQuery );
    (async () =>
     {
     await queryWEB(APIQuery)
    .then ( chainedresponse => chainedresponse.json() )
    .then (  data =>     
        uploadTo('/storeData', {
        temperature: data.main.temp,
        date: newDate,
        usertext: userText,
        location: data.name,
        })
    )
    await queryWEB('/getData')
    .then ( data => data.json() )
    .then (data => { 
        document.getElementById('date').innerHTML     = data.entry.date;
        document.getElementById('temp').innerHTML     = data.entry.temperature;
        document.getElementById('content').innerHTML  = data.entry.usertext;
        document.getElementById('location').innerHTML = data.entry.location;
    })
    })();


    //console.log('clicked');
    } else { 
        //console.log('missing data');
        alert('ZIP code missing');
    }
}
//EventListener
document.getElementById('generate').addEventListener('click', manageData );