import request from "supertest";
import app from "../server";

const requestApp = request(app) as unknown as request.SuperTest<request.Test>;

export default requestApp;
