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

      for (let i = 1; i < title.length; i++) {
        let dateTimeText = dateAndTime[i].innerText;
        let separateDateAndTime = dateTimeText.split('|');
        let startTime = separateDateAndTime[1].split('-');

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

    // Note: below code will generate errors for all repeats, which will happen every time this code runs. This should be optimized at some point
    await events.map(async (event) => {
      try {
        return await Event.create(event);
      } catch (error) {
        console.error(error);
      }
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
