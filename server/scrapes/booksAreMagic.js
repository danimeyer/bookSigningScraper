const puppeteer = require('puppeteer');
const Event = require('../db/event');

const url = 'https://www.booksaremagic.net/?q=h.calevents';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let events = await page.evaluate(() => {
      let title = document.querySelectorAll('.event-title');
      let dateAndTime = document.querySelectorAll('.event-date');

      let eventArray = [];

      for (let i = 0; i < title.length; i++) {
        let dateTimeText = dateAndTime[i].innerText;
        let separateDateAndTime = dateTimeText.split('|');
        let startTime = separateDateAndTime[1].split('-');
// cannot read property split of undefined error
        eventArray[i] = {
          title: title[i].innerText,
          url: 'https://www.booksaremagic.net/?q=h.calevents',
          date: separateDateAndTime[0],
          time: startTime[0].trim(),
          bookstore: 'Books Are Magic',
        };
      }

      return eventArray;
    });

    // console.log(events);

    events.map(async (event) => {
      return await Event.findOrCreate({ where: { url: event.eventUrl } });
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
