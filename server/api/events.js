const router = require('express').Router();
const Event = require('./db/event');

router.get('/', async (req, res, next) => {
  try {
    let events = await Event.findAll();
    res.status(200).send(events);
  } catch (error) {
    next(error);
  }
});

router.get('/:eventId', async (req, res, next) => {
  try {
    let singleEvent = await Event.findById(req.params.eventId);
    res.status(200).send(singleEvent);
  } catch (error) {
    next(error);
  }
});

router.post('/:eventId', async (req, res, next) => {
  try {
    let newEvent = await Event.create(req.body);
    res.status(200).send(newEvent);
  } catch (error) {
    next(error);
  }
});

router.put('/:eventId', async (req, res, next) => {
  try {
    // update event info
  } catch (error) {
    next(error);
  }
});

router.delete('/:eventId', async (req, res, next) => {
  try {
    await Event.destroy({ where: { id: req.params.eventId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
