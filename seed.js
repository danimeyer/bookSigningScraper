const db = require('./server/db/index');
const Event = require('./server/db/event');

const events = [
  {
    title: 'Storytime with Seamus Kirst: Papa, Daddy, and Riley',
    url: 'https://www.booksaremagic.net/?q=h.calevents',
    date: 'Saturday May 23 ',
    time: '11:00AM',
    bookstore: 'Books Are Magic',
  },
  {
    title: 'L.C. Rosen: Camp w/ Adam Sass',
    url: 'https://www.booksaremagic.net/?q=h.calevents',
    date: 'Wednesday May 27 ',
    time: '7:00PM',
    bookstore: 'Books Are Magic',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      events.map((event) => {
        return Event.create(event);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}
