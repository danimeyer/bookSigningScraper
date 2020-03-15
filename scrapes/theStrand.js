const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = 'https://www.strandbooks.com/events/';

// SOLUTION USING PUPPETEER

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

    // Add find or create from Sequelize, find where the url matches, update with current data scraped to ensure latest info
    console.log(events);

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();

// START OF SOLUTION USING CHEERIO

// (async () => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//     const content = await page.content();
//     const $ = cheerio.load(content);
//     const eventArray = [];

//     $('.events__name').each((idx, elem) => {
//       const title = $(elem).text();
//       eventArray.push(title)
//     })

//     console.log(eventArray)

//   } catch (error) {
//     console.error(error)
//   }
// })()
