/**
 * Get a signed integer from a UTC offset
 * @param {string} offset - The offset string from the timezone.
 * @returns {number}
 */
export const getOffsetInteger = (offset) => {
  // eslint-disable-next-line
  const [_, sign, integer] = offset.match(/([+-])([01]\d|2[0-4])(:?[0-5]\d)?/); // Get offset number

  return parseInt(sign + integer);
};
