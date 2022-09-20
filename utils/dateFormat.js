getDateSuffix = (day) => {
    const dayString = day.toString();
    const lastChar = dayString.charAt(dayString.length - 1);

    if (lastChar === '1' && dayString !== '11') {
        return `${dayString}st`;
    } else if (lastChar === '2' && dayString !== '12') {
        return `${dayString}nd`;
    } else if (lastChar === '3' && dayString !== '13') {
        return `${dayString}rd`;
    } else {
        return `${dayString}th`;
    }
}

getShortMonth = (month) => {
    const shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    return shortMonths[month];
}

module.exports = (
    timestamp
) => {
    let formattedDate = '';
    const date = new Date(timestamp);

    // get month
    formattedDate = formattedDate.concat(getShortMonth(date.getMonth()));

    // get day
    formattedDate = formattedDate.concat(` ${getDateSuffix(date.getDate())}`);

    // get year
    formattedDate = formattedDate.concat(` ${date.getFullYear()}`);

    return formattedDate;
};
