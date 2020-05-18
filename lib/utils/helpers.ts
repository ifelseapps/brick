export const getObjectKeys = <T extends Record<string, unknown>>(obj: T): Array<keyof T> => Object.keys(obj);
