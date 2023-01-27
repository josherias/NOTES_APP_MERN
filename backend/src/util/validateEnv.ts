import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(), //shud be of type string
  PORT: port(),
});
