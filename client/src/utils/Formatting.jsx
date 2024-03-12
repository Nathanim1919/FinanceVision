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
    } else if (duration.days() >= 0){
        return `${duration.days()} days left`;
    } else if (duration.days() < 0){
        return `${(duration.days())*-1} days passed.`;
    }
};


function calculateTimeDifference(notificationCreatedAt) {
    const now = Date.now();
    const notificationDate = new Date(notificationCreatedAt);
    const timeDifference = Math.floor((now - notificationDate.getTime()) / 1000); // Convert to seconds
  
    const units = [
      { name: "day", value: 24 * 60 * 60 },
      { name: "hour", value: 60 * 60 },
      { name: "minute", value: 60 },
      { name: "second", value: 1 },
    ];
  
    for (const unit of units) {
      const elapsed = Math.floor(timeDifference / unit.value);
      if (elapsed >= 1) {
        return `${elapsed} ${unit.name}${elapsed > 1 ? 's' : ''} ago`;
      }
    }
  
    return "just now";
  }

export {formatDate, formatNumber, calculateTimeLeft, calculateTimeDifference};