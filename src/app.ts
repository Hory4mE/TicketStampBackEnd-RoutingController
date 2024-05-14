// this shim is required
import { createKoaServer } from "routing-controllers";
import { UserController } from "./modules/Users/UserController";
import { TicketController } from "./modules/Tickets/TicketController";
import { Database } from "./data/database/Database";
import Container from "typedi";
import * as DotEnv from "dotenv";
import { ErrorResponderMiddleware } from "./middlewares/HandlerMiddleware";

// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({

  cors: true, // Allow Cors Blocked
  defaultErrorHandler: false,
  middlewares: [ErrorResponderMiddleware],
  controllers: [UserController, TicketController], // we specify controllers we want to use
});
Container.set(Database, new Database());
// run express application on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
