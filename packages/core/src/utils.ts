import { MessageNode } from "./src/types";

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
