// import { Database } from "@app/data/database/Database";
// import chai from "chai";
// import { before, describe, it } from "mocha";
// import "reflect-metadata";
// import { Container } from "typedi";
 
// describe("check data", function () {
//   const mockDatabase = new Database();
//   Container.set(Database, mockDatabase);
 
//   before(async function () {
//     chai.should();
//     // await mockDatabase.callKnex.migrate.latest();
//   });
 
//   after(async function () {
//     // await mockDatabase.callKnex.destroy();
//   });
 
//   describe("#getAllTickets()", function () {
//     it("should be Emptee", async function () {
//       const result = await mockDatabase.callKnex("knex_migrations").select();
//       console.log(result);
//     });
//   });
// });
 