import { describe, it, expect } from "vitest";
import { defineMessages, at } from "./define-messages";

describe("define-messages", () => {
  describe("defineMessages", () => {
    it("should return messages object", () => {
      const result = defineMessages({
        en: {
          hello: "Hello",
          greeting: "Hello, {name}",
        },
        ja: {
          hello: "こんにちは",
          greeting: "こんにちは、{name}",
        },
      });

      expect(result.messages).toEqual({
        en: {
          hello: "Hello",
          greeting: "Hello, {name}",
        },
        ja: {
          hello: "こんにちは",
          greeting: "こんにちは、{name}",
        },
      });
    });

    it("should work with nested messages", () => {
      const result = defineMessages({
        en: {
          nav: {
            home: "Home",
            about: "About",
          },
        },
        ja: {
          nav: {
            home: "ホーム",
            about: "概要",
          },
        },
      });

      expect(result.messages.en.nav.home).toBe("Home");
      expect(result.messages.ja.nav.home).toBe("ホーム");
    });
  });

  describe("at", () => {
    it("should return messages for specified locale", () => {
      const messages = {
        en: {
          hello: "Hello",
          greeting: "Hello, {name}",
        },
        ja: {
          hello: "こんにちは",
          greeting: "こんにちは、{name}",
        },
      };

      const enMessages = at("en", messages);
      const jaMessages = at("ja", messages);

      expect(enMessages).toEqual({
        hello: "Hello",
        greeting: "Hello, {name}",
      });
      expect(jaMessages).toEqual({
        hello: "こんにちは",
        greeting: "こんにちは、{name}",
      });
    });

    it("should work with nested messages", () => {
      const messages = {
        en: {
          nav: {
            home: "Home",
            about: "About",
          },
        },
        ja: {
          nav: {
            home: "ホーム",
            about: "概要",
          },
        },
      };

      const enNav = at("en", messages).nav;
      const jaNav = at("ja", messages).nav;

      expect(enNav.home).toBe("Home");
      expect(jaNav.home).toBe("ホーム");
    });
  });
});
