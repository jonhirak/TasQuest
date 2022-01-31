const model = require('./model');

module.exports = {
  getQuests: (req, res) => {
    model.getQuests(req, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data.rows);
      }
    })
  }
}