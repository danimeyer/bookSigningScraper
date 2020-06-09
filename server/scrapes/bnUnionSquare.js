const puppeteer = require('puppeteer');

const url = 'https://stores.barnesandnoble.com/store/2675?view=';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let events = await page.evaluate(() => {
      let title = document.querySelectorAll('.lgTitles')
      let date =
      let time =
      let eventUrl = document.querySelectorAll('.col-sm-8.col-md-5.col-lg-5.col-xs-8 a')

      let eventArray = []

      // In for loop, check if title includes story time or book club. If so, increment i and skip event

    })


  } catch (error) {
    console.error(error)
  }
})()
