var userInput = document.querySelector('#cityinput');
var submitButton = document.getElementById("submitbutton");
var messagebox = document.getElementById("messagebox");
var cityList = $('#citylist');
var citycontainer = $('#citycontainer');
var searchHistory = [];
var resetButton = document.getElementById("reset");

buildsearchHistory();

// This function grabs search history from Local Storage
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


//Submit Button Saves City selected by User
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    city = $(cityinput).val()
        //getData();
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
    }
});


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

resetButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    console.log("hello");
    $('.buttonclass').attr({ class: "displaynone", })
    $("#cityinput").val("");
})