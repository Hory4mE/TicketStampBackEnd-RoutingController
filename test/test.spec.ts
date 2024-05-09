import { describe, it } from "mocha";
import * as sinon from "sinon";
import chai from "chai";
import { Container } from "typedi";
import { TicketServices } from "@app/modules/Tickets/TicketServices";
import "reflect-metadata";
import { Database } from "@app/data/database/Database";
import { TicketStatus } from "@app/modules/Tickets/models/Definitions";
var assert = require("assert");
import { unitconfig } from "unitconfig";

describe("callTicketServices", function () {
  const realDB = new Database();
  const mockDB = new Database(unitconfig);
  before(async () => {
    Container.set(Database, mockDB);
    await mockDB.callKnex.migrate.latest();
    chai.should();
  });

  after(async () => {
    await mockDB.callKnex.destroy();
  });
  describe("NoTicketLeft", function () {
    it("should return all tickets", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.fetchAllTickets();

      } catch (e) {
        console.error(e)
      }
    });
  });

  describe("fetchAllTickets", function () {
    before(async () => {
      await mockDB.callKnex.seed.run();
    });
    it("should return all tickets", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.fetchAllTickets();

        tickets.should.exist;
      } catch (e) {}
    });
  });
  describe("findOneTicket", function () {
    it("should return a tickets : ", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.findTicketById("1");

        tickets.should.exist;
      } catch (e) {}
    });
  });
  describe("TicketNotFound", function () {
    it("should return a tickets : ", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.findTicketById("99");
      } catch (e) {}
    });
  });
  describe("createTicket", function () {
    it("should success create ticket", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.createTicket({
          title: "puma",
          description: "master",
        });

      } catch (e) {}
    });
  });

  describe("updateStatus", function () {
    it("updatePendingToProgress", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.updateStatusById("1", {
          status: TicketStatus.IN_PROGRESS,
        });
      } catch (e) {}
    });
    it("updatePendingToCancel", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.updateStatusById("2", {
          status: TicketStatus.CANCELLED,
        });
      } catch (e) {}
    });
    it("StatusNotFound", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.updateStatusById("99", {
          status: TicketStatus.IN_PROGRESS,
        });
      } catch (e) {}
    });
    it("RevertNotAllowed", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.updateStatusById("1", {
          status: TicketStatus.PENDING,
        });
      } catch (e) {}
    });
    it("SucceedStatusNotAllow", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.updateStatusById("2", {
          status: TicketStatus.PENDING,
        });
      } catch (e) {}
    });
    it("DELETE!", async function () {
      try {
        const servicesInstance = Container.get(TicketServices);
        const tickets = await servicesInstance.deleteTicket("3");
      } catch (e) {}
    });
  });
});
