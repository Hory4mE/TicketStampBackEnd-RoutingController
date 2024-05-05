// this shim is required
import { createKoaServer } from 'routing-controllers';
import { UserController } from './modules/Users/UserController';
import { TicketController } from './modules/Tickets/TicketController';


// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({
  controllers: [UserController,TicketController], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})