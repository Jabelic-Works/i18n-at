import { describe, it, expect } from "vitest";
import { defineI18nConfig, DEFAULT_INTERPOLATION_FORMAT } from "./config";

describe("config", () => {
  describe("defineI18nConfig", () => {
    it("should return config with helper functions", () => {
      const config = defineI18nConfig({
        locales: {
          en: { name: "English" },
          ja: { name: "Japanese", direction: "ltr" },
        },
        defaultLocale: "en",
      });

      expect(config.defaultLocale).toBe("en");
      expect(config.localeKeys).toEqual(["en", "ja"]);
      expect(config.interpolationFormat).toBe(DEFAULT_INTERPOLATION_FORMAT);
    });

    it("should validate locales with isValidLocale", () => {
      const config = defineI18nConfig({
        locales: {
          en: { name: "English" },
          ja: { name: "Japanese" },
        },
        defaultLocale: "en",
      });

      expect(config.isValidLocale("en")).toBe(true);
      expect(config.isValidLocale("ja")).toBe(true);
      expect(config.isValidLocale("fr")).toBe(false);
      expect(config.isValidLocale(123)).toBe(false);
    });

    it("should get locale config with getLocaleConfig", () => {
      const config = defineI18nConfig({
        locales: {
          en: { name: "English", direction: "ltr" },
          ja: { name: "Japanese" },
        },
        defaultLocale: "en",
      });

      expect(config.getLocaleConfig("en")).toEqual({
        name: "English",
        direction: "ltr",
      });
      expect(config.getLocaleConfig("ja")).toEqual({ name: "Japanese" });
    });

    it("should support custom interpolation format", () => {
      const config = defineI18nConfig({
        locales: {
          en: { name: "English" },
        },
        defaultLocale: "en",
        interpolationFormat: "intl",
      });

      expect(config.interpolationFormat).toBe("intl");
    });
  });
});
