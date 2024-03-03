/**
 * Formats a date into a string representation.
 * @param {Date} inputDate - The input date to be formatted.
 * @returns {string} The formatted date string.
 */
function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export {formatDate};