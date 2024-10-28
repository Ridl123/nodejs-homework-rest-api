// Importarea modulelor necesare
const request = require("supertest"); // Supertest pentru testarea endpoint-urilor
const app = require("../app"); // Importarea aplicației Express

// Descrierea testelor pentru endpoint-ul de autentificare
describe("POST /login", () => {
  it("ar trebui să răspundă cu codul de status 200 și să returneze un token", async () => {
    // Request către endpoint-ul de login
    const response = await request(app)
      .post("/login") // Endpoint-ul de login
      .send({ email: "test@example.com", password: "password" }); // Datele de autentificare

    // Verificarea codului de status și a structurii răspunsului
    expect(response.statusCode).toBe(200); // Verificare status 200
    expect(response.body).toHaveProperty("token"); // Verificare existență token

    // Verificarea obiectului user
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
