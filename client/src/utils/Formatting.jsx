function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

    function formatAmount(amount, currency) {
        return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        }).format(amount);
    }

    function formatFrequency(frequency) {
        return frequency.charAt(0).toUpperCase() + frequency.slice(1);
    }


export {formatDate, formatAmount, formatFrequency};