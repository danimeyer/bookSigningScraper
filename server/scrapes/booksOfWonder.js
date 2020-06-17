const puppeteer = require('puppeteer');
const Event = require('../db/event');

const url = 'https://booksofwonder.com/blogs/upcoming';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    let events = await page.evaluate(() => {
      let title = document.getElementsByClassName('article-title');
      let date = document.getElementsByClassName('event-date');
      let time = document.querySelectorAll('#time');

      let eventArray = [];

      for (let i = 0; i < title.length; i++) {
        let eventUrl = title[i].childNodes[0].getAttribute('href');

        eventArray[i] = {
          title: title[i].innerText,
          url: 'https://booksofwonder.com' + eventUrl,
          date: date[i].innerText,
          time: time[i].innerText,
          bookstore: 'Books of Wonder',
        };
      }

      return eventArray;
    });

    await events.map(async (event) => {
      try {
        return await Event.create(event);
      } catch (error) {
        console.error(error);
      }
    })

    console.log('Scrape successful');

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
