const { client } = require('./db.js');

client.connect();

module.exports = {
  getQuests: (req, callback) => {
    client.query('SELECT * FROM public.quests INNER JOIN quests_players ON quests.id = quests_players.quest_id where quests_players.player_id = 1', (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
}