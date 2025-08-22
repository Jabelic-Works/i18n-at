import { MessageNode } from "./types";
import {
  DEFAULT_INTERPOLATION_FORMAT,
  type InterpolationFormat,
} from "./config";

export function getValueFromPath(
  obj: MessageNode | undefined,
  path: string
): string | undefined {
  if (!obj) return undefined;

  const keys = path.split(".");
  const result = keys.reduce<string | MessageNode | undefined>(
    (current, key) => {
      if (current === undefined || typeof current === "string") {
        return undefined; // 値が見つからないか、文字列に対してさらにアクセスしようとしている
      }
      return current[key];
    },
    obj
  );

  return typeof result === "string" ? result : undefined;
}

export function interpolateMessage(
  text: string,
  params: Record<string, string | number>,
  format: InterpolationFormat = DEFAULT_INTERPOLATION_FORMAT
): string {
  // no interpolationの場合はそのまま返す
  if (format === "none") {
    return text;
  }

  let result = text;

  for (const [key, value] of Object.entries(params)) {
    let pattern: string;

    switch (format) {
      case "intl":
        pattern = `{$${key}}`;
        break;
      case "legacy":
        pattern = `{${key}}`;
        break;
      case "double":
        pattern = `{{${key}}}`;
        break;
      default:
        continue;
    }

    result = result.replace(
      new RegExp(pattern.replace(/[{}$]/g, "\\$&"), "g"),
      String(value)
    );
  }

  return result;
}
