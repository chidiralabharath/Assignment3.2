const request = require('supertest');
const app = require('../app');
const Player = require('../models/Player');

describe('Player API endpoints', () => {
  let player;

  beforeEach(async () => {
    // Create a test player before each test
    player = await Player.create({
      knownAs: 'newPlayer',
      fullName: 'newPlayer',
      overall: 80,
      potential: 85,
      // Add other fields as needed
    });
  });

  afterEach(async () => {
    // Delete the test player after each test
    await Player.findByIdAndDelete(player._id);
  });

  it('should fetch all players', async () => {
    const res = await request(app).get('/players');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a single player by ID', async () => {
    const res = await request(app).get(`/players/${player._id}`);
    expect(res.status).toBe(200);
    expect(res.body.knownAs).toBe(player.knownAs);
  });

  it('should fetch players by nationality', async () => {
    const res = await request(app).post('/players/query/nationality').send({ nationality: 'Argentina' });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  
  it('should fetch players by age range', async () => {
    const res = await request(app).post('/players/query/age').send({ minAge: 20, maxAge: 30 });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch players by total stats range', async () => {
    const res = await request(app).post('/players/query/totalStats').send({ minTotalStats: 2000, maxTotalStats: 2500 });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should add a new player', async () => {
    const newPlayer = {
      knownAs: 'New Player',
      fullName: 'New Player',
      overall: 75,
      potential: 80,
      // Add other fields as needed
    };
    const res = await request(app).post('/players').send(newPlayer);
    expect(res.status).toBe(201);
    expect(res.body.knownAs).toBe(newPlayer.knownAs);
  });

  it('should update an existing player', async () => {
    const updatedPlayerData = {
      knownAs: 'Updated Player',
      // Add other fields to update
    };
    const res = await request(app).put(`/players/${player._id}`).send(updatedPlayerData);
    expect(res.status).toBe(200);
    expect(res.body.knownAs).toBe(updatedPlayerData.knownAs);
  });

  it('should delete an existing player', async () => {
    const res = await request(app).delete(`/players/${player._id}`);
    expect(res.status).toBe(200);
    expect(res.body.knownAs).toBe(player.knownAs);
  });
});
