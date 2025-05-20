import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "@/index";

const API_PREFIX = "/api/v1";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Student Routes", () => {
  describe(`GET ${API_PREFIX}/students`, () => {
    it("should call getAllStudents handler and return 200 with students data", async () => {

      const response = await request(app).get(`${API_PREFIX}/students`);
      expect(response.status).toBe(200);
    });
  });

  describe(`PUT ${API_PREFIX}/students/:id`, () => {
    it("should call updateStudentById handler and return 200 with updated student data", async () => {
      const studentId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      const updateData = { username: "Jane Doe" };

      const response = await request(app)
        .put(`${API_PREFIX}/students/${studentId}`)
        .send(updateData);

      expect(response.status).toBe(200);
    });

    it("should return 404 if the id is missing in the params", async () => {
      const studentId = "";
      const updateData = { username: "Jane Doe" };

      const response = await request(app)
        .put(`${API_PREFIX}/students/${studentId}`)
        .send(updateData);

      expect(response.status).toBe(404);
    });

    it("should return 400 if the params type isn't of type uuid", async () => {
      const studentId = "not a uuid";
      const updateData = { username: "Jane Doe" };

      const response = await request(app)
        .put(`${API_PREFIX}/students/${studentId}`)
        .send(updateData);

      expect(response.status).toBe(400);
    });

    it("should return 400 if the request's body doesn't match the table schema", async () => {
      const studentId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
      const updateData = { firstName: "Jane Doe" };

      const response = await request(app)
        .put(`${API_PREFIX}/students/${studentId}`)
        .send(updateData);

      expect(response.status).toBe(400);
    });

    it("should return 404 if the student doesn't exist in the database", async () => {
      const studentId = "55ae473f-bcb7-4bb1-9115-9caa84ad4b46";
      const updateData = { username: "Jane Doe" };

      const response = await request(app)
        .put(`${API_PREFIX}/students/${studentId}`)
        .send(updateData);

      expect(response.status).toBe(404);
    });
  });
});
