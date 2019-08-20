const { writeFileSync } = require('fs')
const ics = require('ics')

let moment = require("moment")

let start = moment('2019-07-10T18:00Z').format('YYYY-M-D-H-m').split("-")

let events = [
  {
    start: start,
    duration: { hours: 0, minutes: 30 },
    title: 'First ICS event',
    description: 'Getting ICS node package integrated with this repo',
    location: 'Virgin Train, West Coast Mainline',
    url: 'https://kickofftimestemplate.netlify.com/',
    categories: ['Code', 'Side Projects', 'Kick Off'],
    status: 'CONFIRMED',
    organizer: { name: 'Si Jobling', email: 'simon.jobling@gmail.com' },
  },
  {
    start: [2019, 8, 20, 8, 20],
    duration: { hours: 0, minutes: 30 },
    title: 'Second ICS event',
    description: 'Creating a second event',
    location: 'London Euston Train Station',
    url: 'https://kickofftimestemplate.netlify.com/',
    categories: ['Code', 'Side Projects', 'Kick Off'],
    status: 'CONFIRMED',
    organizer: { name: 'Si Jobling', email: 'simon.jobling@gmail.com' },
  },
]
 
ics.createEvents(events, (error, value) => {
  if (error) {
    console.log(error)
    return
  }
 
  console.log(value)  
  writeFileSync(`${__dirname}/event.ics`, value)

})