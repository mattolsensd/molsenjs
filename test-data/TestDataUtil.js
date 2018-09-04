const assert = require('assert');

function getRandom(ary) {
    return ary && ary.length ? ary[randomInt(0, ary.length - 1)] : null;
}

function randomBool() {
    return new Date().getTime() % 2 === 0;
}

function randomInt(min, max) {
    assert(max >= min);
    let difference = max - min;
    return Math.floor(Math.random() * difference) + min;
}

function randomDate() {
    return new Date(Math.floor((Math.random() + randomInt(0, 1)) * new Date().getTime()));
}


function randomPastDate() {
    return new Date(Math.floor(Math.random() * new Date().getTime()));
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function randomRecentDate(maxOffset) {
    assert(maxOffset >= 0, "maxOffset must be greater than or equal to zero");
    return addDays(new Date(), -randomInt(0, maxOffset));
}

function randomDateInRange(min, max) {
    assert(min instanceof Date, "min must be a Date");
    assert(max instanceof Date, "max must be a Date");
    assert(min < max, "min must be before max");
    let diff = (max.getTime()) - (min.getTime());
    return new Date(min.getTime() + randomInt(0, diff));
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    getRandom: getRandom,
    randomBool: randomBool,
    randomInt: randomInt,
    randomDate: randomDate,
    randomPastDate: randomPastDate,
    randomRecentDate: randomRecentDate,
    randomDateInRange: randomDateInRange,
    copy: copy
};
