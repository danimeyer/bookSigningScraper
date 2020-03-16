const db = require('./server/db/index')
const Event = require('./server/db/event')

const events = [
  {
    title: 'Storytime with Seamus Kirst: Papa, Daddy, and Riley',
    url: 'https://www.booksaremagic.net/?q=h.calevents',
    date: 'Saturday May 23 ',
    time: '11:00AM',
    bookstore: 'Books Are Magic'
  },
  {
    title: 'L.C. Rosen: Camp w/ Adam Sass',
    url: 'https://www.booksaremagic.net/?q=h.calevents',
    date: 'Wednesday May 27 ',
    time: '7:00PM',
    bookstore: 'Books Are Magic'
  }
]

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      events.map(event => {
        return Event.create(event);
      })
    );

    console.log('seed successful')

  } catch (err) {
    console.log('something went wrong: ', err);
  }
};

module.exports = seed;
