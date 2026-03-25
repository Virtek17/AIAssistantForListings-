import { PARAM_LABELS, REQUIRED_FIELDS_MAP } from "./constants";
import type { AdItem } from "../api/index";

export const getMissingFields = (item: AdItem) => {
  const missing: string[] = [];

  if (!item.description || item.description.trim().length === 0) {
    missing.push("Описание");
  }

  const requiredParams = REQUIRED_FIELDS_MAP[item.category] || [];

  requiredParams.forEach((fieldKey) => {
    const value = item.params?.[fieldKey as keyof typeof item.params];

    if (value === undefined || value === null || value === "") {
      missing.push(PARAM_LABELS[fieldKey] || fieldKey);
    }
  });

  return missing;
};
