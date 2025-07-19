import { generateId } from "../utils";

describe("unit utils", () => {
  describe("generateId", () => {
    it("generates unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      const id3 = generateId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id3).toBeDefined();

      expect(id1).not.toBe(id2);
      expect(id2).not.toBe(id3);
      expect(id1).not.toBe(id3);
    });

    it("generates IDs with expected format", () => {
      const id = generateId();

      // Expected format: "number.timestamp.random"
      const parts = id.split(".");
      expect(parts).toHaveLength(4);

      expect(Number(parts[0])).toBeGreaterThan(0);
      expect(Number(parts[1])).toBeGreaterThan(0);
      expect(Number(parts[2])).toBeGreaterThanOrEqual(0);
    });

    it("increments the counter on each call", () => {
      const id1 = generateId();
      const id2 = generateId();
      const id3 = generateId();

      const parts1 = id1.split(".");
      const parts2 = id2.split(".");
      const parts3 = id3.split(".");

      const counter1 = Number.parseInt(parts1[0] || "0");
      const counter2 = Number.parseInt(parts2[0] || "0");
      const counter3 = Number.parseInt(parts3[0] || "0");

      expect(counter2).toBe(counter1 + 1);
      expect(counter3).toBe(counter2 + 1);
    });
  });
});
