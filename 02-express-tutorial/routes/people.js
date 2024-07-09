const express = require("express");
const router = express.Router();
const {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
} = require('../controllers/people');


router.route('/').get(getPeople).post(addPerson)
router.route('/add').post(addPerson)
router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson)

module.exports = {router};
