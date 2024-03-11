/**
 * Formats a date into a string representation.
 * @param {Date} inputDate - The input date to be formatted.
 * @returns {string} The formatted date string.
 */
import moment from 'moment';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num;
    }
}


const calculateTimeLeft = (startDate, deadline) => {
    const now = moment(startDate);
    const end = moment(deadline);

    const diff = end.diff(now);

    const duration = moment.duration(diff);

    if (duration.years() > 0) {
        return `${duration.years()} years left`;
    } else if (duration.months() > 0) {
        return `${duration.months()} months left`;
    } else if (duration.weeks() > 0) {
        return `${duration.weeks()} weeks left`;
    } else if (duration.days() > 0){
        return `${duration.days()} days left`;
    } else if (duration.hours() > 0){
        return `${duration.hours()} hours left`;
    } else if (duration.minutes() > 0){
        return `${duration.minutes()} minutes left`;
    } else {
        return `${(duration.days())*-1} days passed.`;
    }
};

export {formatDate, formatNumber, calculateTimeLeft};