const puppeteer = require('puppeteer');
const Event = require('../db/event');

const url = 'https://www.strandbooks.com/events/';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let events = await page.evaluate(() => {
      let title = document.querySelectorAll('.eventslist-header__h3');
      let date = document.getElementsByClassName('eventslist-date__p');
      let eventUrl = document.querySelectorAll('.eventslist-link__link');

      let eventArray = [];

      for (let i = 0; i < title.length; i++) {
        let dateAndTime = date[i].innerText.split(' ');
        let startTime = dateAndTime.slice(3).join(' ');

        eventArray[i] = {
          title: title[i].innerText,
          url: 'https://www.strandbooks.com' + eventUrl[i].getAttribute('href'),
          date: dateAndTime.slice(0, 3).join(' '),
          time: startTime.slice(0, 7),
          bookstore: 'The Strand',
        };
      }

      return eventArray;
    });

    // Note: below code will generate errors for all repeats, which will happen every time this code runs. This should be optimized at some point
    await events.map(async (event) => {
      try {
        return await Event.create(event);
      } catch (error) {
        console.error(error);
      }
    });

    console.log('Scrape successful');

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
