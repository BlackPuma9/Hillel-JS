'use strict'

const yearBirth = prompt('Please provide your year of birth')
const city = prompt('Please provide city where you are living')
const sport = prompt('What kind of sport do you like?')

const cities = ['Kiev', 'Washington', 'London']
const sports = ['running', 'tennis', 'football']

function getCapitalByCity(city) {
    switch (city) {
        case 'Kiev':
            return 'Ukraine'
        case 'Washington':
            return 'US'
        case 'London':
            return 'UK'
        default:
            throw new Error(`Unknown city ${city}`)
    }
}

function getChampionBySport(sport) {
    switch (sport) {
        case 'running':
            return 'Usain Bolt'
        case 'tennis':
            return 'Roger Federer'
        case 'football':
            return 'Andrii Shevchenko'
        default:
            throw new Error(`Unknown sport ${sport}`)
    }
}

let ageResult = 'Unfortunately you didnt provide your year of birth'
if (yearBirth !== null) {
    ageResult = yearBirth.match(/\d{4}/g)
        ? new Date().getFullYear() - yearBirth
        : 'Unfortunately you didnt provide your year of birth'
}

let cityResult = 'Unfortunately you didnt provide your city'
if (city !== null) {
    cityResult = cities.includes(city.trim())
        ? `You live in the capital of ${getCapitalByCity(city)}`
        : `You live in the city ${city}`
}

let sportResult = 'Unfortunately you didnt provide your sport'
if (sport !== null) {
    sportResult = sports.includes(sport.toLowerCase().trim())
        ? `Cool! Do you want to be like ${getChampionBySport(sport)}`
        : `Your favourite sport is ${sport}`
}

alert(ageResult + '\n' + cityResult + '\n' + sportResult)

// console.log(cityResult)
