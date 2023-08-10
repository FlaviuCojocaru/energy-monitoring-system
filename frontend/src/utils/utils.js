// function to convert camelCase to snake_case
export const camelize = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

// function to convert snake_case to camelCase
export const snakeize = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// function to capitalize the first letter of a string
export const capitalize = (string) => string.charAt(0) + string.slice(1).toLowerCase();
