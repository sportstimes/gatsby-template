const { writeFileSync } = require('fs')
const ics = require('ics')

let moment = require("moment")

const events = [
  {
    start: [2019, 8, 20, 7, 50],
    duration: { hours: 0, minutes: 30 },
    title: 'First ICS event',
    description: 'Getting ICS node package integrated with this repo',
    location: 'Virgin Train, West Coast Mainline',
    url: 'https://kickofftimestemplate.netlify.com/',
    categories: ['Code', 'Side Projects', 'Kick Off'],
    status: 'CONFIRMED',
    organizer: { name: 'Si Jobling', email: 'simon.jobling@gmail.com' },
  }
]
 
ics.createEvents(events, (error, value) => {
  if (error) {
    console.log(error)
    return
  }
 
  console.log(value)  
  writeFileSync(`${__dirname}/event.ics`, value)

})