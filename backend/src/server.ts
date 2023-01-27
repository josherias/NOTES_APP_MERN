import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");

    app.listen(port, () => {
      console.log("Sever running on port" + port);
    });
  })
  .catch((err) => console.error(err));