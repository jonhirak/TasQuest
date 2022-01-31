const express = require('express')
const controller = require('./controller');
const app = express();
const port = 3000;

app.get('/quests', (req, res) => {
  controller.getQuests(req, res);
});

app.post('/quest', (req, res) => {
  controller.postQuest(req, res);
});

app.post('/task', (req, res) => {
  controller.postTask(req, res);
});

app.put('/complete', (req, res) => {
  controller.completeTask(req, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})