const puppeteer = require('puppeteer');
const Event = require('../db/event');

const url = 'https://stores.barnesandnoble.com/store/2255';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    let events = await page.evaluate(() => {
      // Grab title, date, time, url
      let title = document.getElementsByClassName('lgTitles');
      let eventGroup = document.getElementsByClassName('col-sm-8 col-md-5 col-lg-5 col-xs-8');


      let eventArray = [];

      for (let i = 0; i < title.length; i++) {
        eventArray[i] = {
          title: '',
          url: '',
          date: '',
          time: '',
          bookstore: '',
        };
      }

      return eventArray;
    });

    console.log(events); // Remove after testing

    // await events.map(async (event) => {
    //   try {
    //     return await Event.create(event);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })

    // console.log('Scrape successful');

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
