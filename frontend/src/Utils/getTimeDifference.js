export const getTimeDiff = (fromDateTime, toDateTime) => {
    let fromDateTime = typeof fromDateTime !== 'undefined' ? fromDateTime : "2014-01-01 01:02:03.123456";

    let fromDateTime = new Date(fromDateTime).getTime();
    toDateTime = toDateTime.getTime();

    if (isNaN(fromDateTime)) {
        return "";
    }
    console.log(fromDateTime + " " + toDateTime);

    if (fromDateTime < toDateTime) {
        var milisec_diff = toDateTime - fromDateTime;
    } else {
        var milisec_diff = fromDateTime - toDateTime;
    }

    let days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
    let date_diff = new Date(milisec_diff);

    return days + " Days " + date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
}