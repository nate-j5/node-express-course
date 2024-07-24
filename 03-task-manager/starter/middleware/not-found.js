const notFound = (req, res) => res.status(404).send("Sorry! This Route is not found");

module.exports = notFound;
