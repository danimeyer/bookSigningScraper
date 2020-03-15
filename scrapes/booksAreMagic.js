const puppeteer = require('puppeteer');

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
        // console.log(title[i].innerText)
        let separateDateAndTime = dateTimeText.split('|')
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

    console.log(events);

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
