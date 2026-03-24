import { PARAM_LABELS, REQUIRED_FIELDS_MAP } from "./constants"

export const getMissingFields = (item: any) => {
    const missing = []
    
    if (!item.description || item.description.trim().length === 0) {
        missing.push("Описание")
    }

    const requiredParams = REQUIRED_FIELDS_MAP[item.category] || []

    requiredParams.forEach((fieldKey) => {
        const value = item.params?.[fieldKey];

        if (value === undefined || value === null || value === '') {
            missing.push(PARAM_LABELS[fieldKey] || fieldKey)
        }
    })

    return missing

}