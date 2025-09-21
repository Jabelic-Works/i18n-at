import { describe, it, expect } from "vitest";
import { getValueFromPath, interpolateMessage } from "./utils";

describe("utils", () => {
  describe("getValueFromPath", () => {
    it("should get value from simple path", () => {
      const obj = {
        hello: "Hello",
        greeting: "Hello, {name}",
      };

      expect(getValueFromPath(obj, "hello")).toBe("Hello");
      expect(getValueFromPath(obj, "greeting")).toBe("Hello, {name}");
    });

    it("should get value from nested path", () => {
      const obj = {
        nav: {
          home: "Home",
          about: "About",
        },
        user: {
          profile: {
            name: "John",
          },
        },
      };

      expect(getValueFromPath(obj, "nav.home")).toBe("Home");
      expect(getValueFromPath(obj, "nav.about")).toBe("About");
      expect(getValueFromPath(obj, "user.profile.name")).toBe("John");
    });

    it("should return undefined for non-existent paths", () => {
      const obj = {
        hello: "Hello",
      };

      expect(getValueFromPath(obj, "world")).toBeUndefined();
      expect(getValueFromPath(obj, "hello.world")).toBeUndefined();
      expect(getValueFromPath(undefined, "hello")).toBeUndefined();
    });

    it("should return undefined for invalid paths", () => {
      const obj = {
        hello: "Hello",
      };

      // 文字列に対してさらにアクセスしようとする場合
      expect(getValueFromPath(obj, "hello.invalid")).toBeUndefined();
    });
  });

  describe("interpolateMessage", () => {
    it("should interpolate with legacy format (default)", () => {
      const result = interpolateMessage("Hello, {name}!", { name: "World" });
      expect(result).toBe("Hello, World!");
    });

    it("should interpolate with intl format", () => {
      const result = interpolateMessage(
        "Hello, {$name}!",
        { name: "World" },
        "intl"
      );
      expect(result).toBe("Hello, World!");
    });

    it("should interpolate with double format", () => {
      const result = interpolateMessage(
        "Hello, {{name}}!",
        { name: "World" },
        "double"
      );
      expect(result).toBe("Hello, World!");
    });

    it("should handle multiple parameters", () => {
      const result = interpolateMessage(
        "Hello, {firstName} {lastName}! You are {age} years old.",
        { firstName: "John", lastName: "Doe", age: 25 }
      );
      expect(result).toBe("Hello, John Doe! You are 25 years old.");
    });

    it("should return original text with none format", () => {
      const result = interpolateMessage(
        "Hello, {name}!",
        { name: "World" },
        "none"
      );
      expect(result).toBe("Hello, {name}!");
    });

    it("should handle missing parameters gracefully", () => {
      const result = interpolateMessage("Hello, {name}!", {});
      expect(result).toBe("Hello, {name}!");
    });

    it("should handle numbers", () => {
      const result = interpolateMessage("Count: {count}", { count: 42 });
      expect(result).toBe("Count: 42");
    });

    it("should escape regex special characters", () => {
      const result = interpolateMessage("Price: {price}$", { price: 100 });
      expect(result).toBe("Price: 100$");
    });
  });
});
