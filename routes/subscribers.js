const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// get all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.send(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// middleware for single subscriber retrieval
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find the subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.subscriber = subscriber;
  next()
}

// get 1 subscriber
router.get('/:id', getSubscriber, (req, res) => {
  // res.send(res.subscriber.name);
  res.json(res.subscriber);
})

// create 1 subscriber
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// update 1 subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name !== null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel !== null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// delete 1 subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    return res.status(200).json({ message: "Deleted subscriber" })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;