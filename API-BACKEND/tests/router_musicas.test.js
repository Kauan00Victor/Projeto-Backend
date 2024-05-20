const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

id = null

describe('API  Spotify', () => {
    test('Deve retornar 201 e um JSON no POST /musicas', async () => {
        const result = await request
            .post("/musicas")
            .send({"cantor": "Drake", "nome": "God's Plan"});
        id = result.body._id.toString();
        expect(result.status).toBe(201);
        expect(result.body).toHaveProperty("cantor", "Drake","nome", "God's Plan");
    });
})