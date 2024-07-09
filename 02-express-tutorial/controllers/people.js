const { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res.status(201).json({ success: true, person: newPerson });
};
const getPersonById = (req, res) => {
  const personId = parseInt(req.params.id, 10);
  const person = people.find((p) => p.id === personId);
  if (!person) {
    return res.status(404).json({ success: false, msg: `No person with id ${personId}` });
  }
  res.status(200).json({ success: true, data: person });
};

const updatePerson = (req, res) => {
  const personId = parseInt(req.params.id, 10);
  const { name } = req.body;
  const person = people.find((p) => p.id === personId);
  if (!person) {
    return res.status(404).json({ success: false, msg: `No person with id ${personId}` });
  }
  person.name = name;
  res.status(200).json({ success: true, data: person });
};

const deletePerson = (req, res) => {
  const personId = parseInt(req.params.id, 10);
  const personIndex = people.findIndex((p) => p.id === personId);
  if (personIndex === -1) {
    return res.status(404).json({ success: false, msg: `No person with id ${personId}` });
  }
  const deletedPerson = people.splice(personIndex, 1);
  res.status(200).json({ success: true, data: deletedPerson });
};

module.exports = { getPeople, addPerson, getPersonById, updatePerson, deletePerson };
