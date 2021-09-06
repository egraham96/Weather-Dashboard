var userInput = document.querySelector('#cityinput');
var submitButton = document.getElementById("submitbutton");
var messagebox = document.getElementById("messagebox");
var cityList = $('#citylist');
var citycontainer = $('#citycontainer');
var searchHistory = [];
var weatherbox = document.getElementById("weatherbox");
var resetButton = document.getElementById("reset");


buildsearchHistory();

// This Function grabs Search History from Local Storage
function buildsearchHistory() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };
    // lists up to 8
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
        }
        var buttonlistEl = $('<button>').attr({
            class: "buttonclass",
        })
        var buttonlistDetail = searchHistory[i];
        buttonlistEl.text(buttonlistDetail);
        buttonlistEl.appendTo(cityList);

    }
};


//Submit Button Saves City Selected by User
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    city = $(cityinput).val()
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        $("#cityinput").val("");
        messagebox.textContent = "Please Choose A Different City";
        return
    } else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var citylistButton = $('<button>').attr({
            class: "buttonclass",
        });
        var citybuttonDetail = $(cityinput).val()
        citylistButton.text(citybuttonDetail);
        citylistButton.appendTo(cityList);
        $("#cityinput").val("");
        getData(city);
    }
});


function getData(city) {
    var apiKey = 'b748bb5e0d9a2b21227f16e116293fbd';
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
    fetch(currentWeatherURL)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(response);
                    console.log(data);
                    $("#citychosen").text(city);
                    $("#temp").text("Current Tempature: " + data.main.temp + "° Fahrenheit");
                    $("#humid").text("Current Humidity : " + data.main.humidity);
                    $("#wind").text("Current Windspeed: " + data.wind.speed + "Knots");
                    setDate();
                    setUV();

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to OpenWeather');
        });
};





//Autocomplete Function Runs when User Searches for a City
$(function() {
    var cityNames = [
        'Abidjan',
        'Addis Ababa',
        'Ahmedabad',
        'Albuquerque',
        'Alexandria',
        'Ankara',
        'Arlington',
        'Atlanta',
        'Austin',
        'Baghdad',
        'Baltimore',
        'Bangalore',
        'Bangkok',
        'Barcelona',
        'Beijing',
        'Belo Horizonte',
        'Bogota',
        'Boston',
        'Brasilia',
        'Buenos Aires',
        'Cairo',
        'Cape Town',
        'Changchun',
        'Changsha',
        'Charlotte',
        'Chengdu',
        'Chennai',
        'Chicago',
        'Chittagong',
        'Chongqing',
        'Colorado Springs',
        'Columbus',
        'Dalian',
        'Dallas',
        'Dar Es Salaam',
        'Delhi',
        'Denver',
        'Detroit',
        'Dhaka',
        'Dongguan',
        'El Paso',
        'Fort Worth',
        'Foshan',
        'Fresno',
        'Fukuoka',
        'Guadalajara',
        'Guangzhou',
        'Haerbin',
        'Hangzhou',
        'Hanoi',
        'Hefei',
        'Ho Chi Minh City',
        'Hong Kong',
        'Houston',
        'Hyderabad',
        'Indianapolis',
        'Istanbul',
        'Jacksonville',
        'Jakarta',
        'Ji Nan Shandong',
        'Jiddah ',
        'Johannesburg',
        'Kabul',
        'Kansas City',
        'Karachi',
        'Khartoum',
        'Kinshasa',
        'Kolkata',
        'Kuala Lumpur',
        'Kunming',
        'Lagos',
        'Lahore',
        'Las Vegas',
        'Lima',
        'London',
        'Long Beach',
        'Los Angeles',
        'Louisville',
        'Luanda',
        'Madrid',
        'Manila',
        'Melbourne',
        'Memphis',
        'Mesa',
        'Mexico City',
        'Miami',
        'Milwaukee',
        'Minneapolis',
        'Monterrey',
        'Montreal',
        'Moscow',
        'Mumbai',
        'Nagoya',
        'Nairobi',
        'Nanjing',
        'Nashville',
        'New York City',
        'Ningbo',
        'Oakland',
        'Oklahoma City',
        'Omaha',
        'Osaka',
        'Paris',
        'Philadelphia',
        'Phoenix',
        'Portland',
        'Pune',
        'Qingdao',
        'Raleigh',
        'Recife',
        'Rio De Janeiro',
        'Riyadh',
        'Rome',
        'Sacramento',
        'Saint Petersburg',
        'San Antonio',
        'San Diego',
        'San Francisco',
        'San Jose',
        'Santiago',
        'Sao Paulo',
        'Seattle',
        'Seoul',
        'Shanghai',
        'Shantou',
        'Shenyang',
        'Shenzhen',
        'Shijiazhuang ',
        'Singapore',
        'Surat ',
        'Suzhou',
        'Sydney',
        'Tampa',
        'Tehran',
        'Tel Aviv',
        'Tianjin',
        'Tokyo',
        'Toronto',
        'Tucson',
        'Tulsa ',
        'Urumqi',
        'Virginia Beach ',
        'Washington DC',
        'Wuhan',
        'Xi An Shaanxi',
        'Xinbei',
        'Yangon ',
        'Zhengzhou'
    ];
    $("#cityinput").autocomplete({
        source: cityNames,
    });
});



//This function sets the Date
function setDate() {
    var weatherDay = moment().format('(MM/DD/YYYY)');
    $("#todaydate").text(weatherDay);
    //var oneDay = moment().add(01, 'days').format('MM/D/YYYY')
    //$("#forecast-date").text(oneDay);
    //var twoDay = moment().add(02, 'days').format('MM/DD/ YYYY ')
    //$("#forecast-date2").text(twoDay);
    //var threeDay = moment().add(03, 'days').format('MM/D/YYYY')
    //$("#forecast-date3").text(threeDay);
    //var fourDay = moment().add(04, 'days').format('MM/D/YYYY')
    //$("#forecast-date4").text(fourDay);
    //var fiveDay = moment().add(05, 'days').format('MM/D/YYYY')
    //$("#forecast-date5").text(fiveDay);
}

function setUV(data) { $("#UV").text(data.name); }

//This Function Clears Local Storage
resetButton.addEventListener("click", function() {
    searchHistory.length = 0;
    localStorage.clear();
    $('.buttonclass').attr({ class: "displaynone", })
    $("#cityinput").val("");
})