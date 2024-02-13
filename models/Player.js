// models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  fullName: String,
  valueInEuro: Number,
  positionsPlayed: String,
  bestPosition: String,
  nationality: String,
  age: Number,
  heightInCm: Number,
  weightInKg: Number,
  totalStats: Number,
  clubName: String,
 
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
