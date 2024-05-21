const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

id = null

describe('API  Spotify', () => {
    test('Deve retornar 201 e um JSON no POST /musicas', async () => {
        const result = await request
            .post("/musicas")
            .send({ cantor: "Drake", nome: "God's Plan" });
        id = result.body._id.toString();
        expect(result.status).toBe(201);
        expect(result.type).toBe("application/json")
    })
    test("Deve retornar 422 e um JSON para POST /musicas", async () => {
        const result = await request
            .post("/musicas");
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json")
    })
    test("Deve retornar 200 e um JSON array para GET /musicas", async () => {
        const result = await request
            .get("/musicas");
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        if (result.body.length > 0) {
            id = result.body[0]._id.toString();
        }
    })
    test("Deve retornar 200 e um JSON para GET /musicas/id", async () => {
        const result = await request
            .get(`/musicas/${id}`)
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json")
    })
    test("Deve retornar 404 e um JSON para GET /musicas/id", async () => {
        const result = await request
            .get(`/musicas/id`);
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json")
    })

})