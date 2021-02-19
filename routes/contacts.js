const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');
/*
 * @route   GET api/contacts
 * @desc    get all users contacts
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }

  res.send('get all contacts for logged in user');
});

/*
 * @route   POST api/contacts
 * @desc    add new contact
 * @access  Private
 */
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    /* checks the validation and sends back to the user
     * a 400 status error if the checks have failed.
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/*
 * @route   PUT api/contacts/:id
 * @desc    update contact for logged in user
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build a contat object
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'contact not found' });
    }

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // perform the update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    // send back the contact
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

/*
 * @route   DELETE api/contacts/:id
 * @desc    delete a contact for logged in user
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'contact not found' });
    }

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // perform the update
    await Contact.findByIdAndRemove(req.params.id);
    // send back the contact
    res.json({ message: 'contact removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
