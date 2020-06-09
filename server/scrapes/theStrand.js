const puppeteer = require('puppeteer');
const Event = require('../db/event');

const url = 'https://www.strandbooks.com/events/';

// UPDATE BELOW CODE --> THE STRAND UPDATED THEIR EVENTS PAGE

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let events = await page.evaluate(() => {
      let title = document.querySelectorAll('.events__name');
      let date = document.querySelectorAll('.value.date');
      let time = document.querySelectorAll('span.dtstart .value.time');
      let eventUrl = document.querySelectorAll('.events__name a');

      let eventArray = [];

      for (let i = 0; i < title.length; i++) {
        eventArray[i] = {
          title: title[i].innerText,
          url: eventUrl[i].getAttribute('href'),
          date: date[i].innerText.slice(0, -1),
          time: time[i].innerText,
          bookstore: 'The Strand',
        };
      }

      return eventArray;
    });

    console.log(events);
    // events.map((event) => {
    //   return await Event.findOrCreate({ where: { url: event.eventUrl } });
    // });

    console.log('Scrape successful')

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
