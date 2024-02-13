// routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Add player
router.post('/', async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update player
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Perform query to find players by nationality
router.post('/query/nationality', async (req, res) => {
  try {
    const { nationality } = req.body;
    const players = await Player.find({ nationality });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Perform query to find players by age range
router.post('/query/age', async (req, res) => {
  try {
    const { minAge, maxAge } = req.body;
    const players = await Player.find({ age: { $gte: minAge, $lte: maxAge } });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Perform query to find players by total stats
router.post('/query/totalStats', async (req, res) => {
  try {
    const { minTotalStats, maxTotalStats } = req.body;
    const players = await Player.find({ totalStats: { $gte: minTotalStats, $lte: maxTotalStats } });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
