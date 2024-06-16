const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let id = null;

describe('API Spotify', () => {
    test('Deve retornar 201 e um JSON no POST /musicas', async () => {
        const result = await request
            .post("/musicas")
            .send({ cantor: "Drake", nome: "God's Plan" });
        id = result.body._id.toString();
        expect(result.status).toBe(201);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 422 e um JSON para POST /musicas", async () => {
        const result = await request
            .post("/musicas");
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 200 e um JSON array para GET /musicas", async () => {
        const result = await request
            .get("/musicas");
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
        if (result.body.length > 0) {
            id = result.body[0]._id.toString();
        }
    });

    test("Deve retornar 200 e um JSON para GET /musicas/id", async () => {
        if (!id) {
            console.error("Não há ID disponível para o teste de GET /musicas/id");
            return;
        }
        const result = await request
            .get(`/musicas/${id}`);
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 404 e um JSON para GET /musicas/id", async () => {
        const result = await request
            .get(`/musicas/id`);
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 200 e um JSON para PUT /musicas/id", async () => {
        if (!id) {
            console.error("Não há ID disponível para o teste de PUT /musicas/id");
            return;
        }
        const result = await request
            .put(`/musicas/${id}`)
            .send({ cantor: "Tyler the Creator", nome: "EARTHQUAKE" });
        expect(result.status).toBe(200);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 404 e um JSON para PUT /musicas/id", async () => {
        const result = await request
            .put(`/musicas/id`);
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 422 e um JSON para PUT /musicas/id", async () => {
        if (!id) {
            console.error("Não há ID disponível para o teste de PUT /musicas/id");
            return;
        }
        const result = await request
            .put(`/musicas/${id}`)
            .send({});
        expect(result.status).toBe(422);
        expect(result.type).toBe("application/json");
    });

    test("Deve retornar 204 e um JSON para DELETE /musicas/id", async () => {
        if (!id) {
            console.error("Não há ID disponível para o teste de DELETE /musicas/id");
            return;
        }
        const result = await request
            .delete(`/musicas/${id}`);
        expect(result.status).toBe(204);
        expect(result.type).toBe("");
    });

    test("Deve retornar 404 e um JSON para DELETE /musicas/id", async () => {
        const result = await request
            .delete(`/musicas/id`);
        expect(result.status).toBe(404);
        expect(result.type).toBe("application/json");
    });
});
