/* Global Variables */
const apiKey = '1da5c96e1212cf08beceee5c2a5277e4';
let content;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Get generate button and add listener for its click
const generate_btn = document.getElementById('generate');
generate_btn.addEventListener('click', displayData);

// Create function to execute when btn clicked
function displayData(event) {
    // Get the zip code which user enter it
    if (document.getElementById('zip').value === "") {
        alert('Please Enter zip code!');
        return;
    }
    const zipCode = document.getElementById('zip').value;

    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    if (document.getElementById('feelings').value === "") {
        alert('Please enter feelings!');
        return;
    }
    content = document.getElementById('feelings').value;
    // Call the async function that will fetch the weather API    
     getWeatherData(weatherURL);    
   
}

// Create the asynchronous function to fetch the API
const getWeatherData = async (Wurl) => {
    // Use await key word to get the fetch its time
    const result = await fetch(Wurl);
    try { // Get the api data
        const weatherData = await result.json();
        const temprature = weatherData.main.temp;

        await fetch('/postWeatherData', {
            method: "POST",
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: newDate,
                temp: temprature,
                content: content
            }),
        });
        const getData = await fetch('/weatherData');
        const receivedData = await getData.json();
        
        document.getElementById('date').innerText =  receivedData.date;
        document.getElementById('temp').innerText = `${receivedData.temp}℃`;
        document.getElementById('content').innerText =  receivedData.content;
        return receivedData;
    }
    catch (error) { // If there is an error catch it, and write it in the console
        console.log('Error', error);
    }
}