const express = require('express');
const router = express.Router();

/*
 * @route   GET api/contacts
 * @desc    get all users contacts
 * @access  Private
 */
router.get('/', (req, res) => {
  res.send('get all contacts for logged in user');
});

/*
 * @route   POST api/contacts
 * @desc    add new contact
 * @access  Private
 */
router.post('/', (req, res) => {
  res.send('add new contact for logged in user');
});

/*
 * @route   PUT api/contacts/:id
 * @desc    update contact for logged in user
 * @access  Private
 */
router.put('/:id', (req, res) => {
  res.send('update a contact for logged in user');
});

/*
 * @route   DELETE api/contacts/:id
 * @desc    delete a contact for logged in user
 * @access  Private
 */
router.delete('/:id', (req, res) => {
  res.send('delete a contact for logged in user');
});

module.exports = router;
