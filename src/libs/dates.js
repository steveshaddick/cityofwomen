// import moment from 'moment';
import moment from 'moment-timezone';

//
moment.tz.setDefault('America/Toronto');

/**
 *
 *
 * @export
 * @returns
 */
export function now() {
  return moment();
}

/**
 *
 *
 * @export
 * @param {any} date
 * @returns
 */
export function date(date) {
  return moment(date);
}

/**
 * longDate - Description
 *
 * @return {type} Description
 */
export function longDate() {
  return new Date().toString();
}

/**
 * datapointDate - Description
 *
 * @param {type} date Description
 *
 * @return {type} Description
 */
export function datapointDate(date, format = 'DD-MMM-YYYY') {
  return moment.tz(date, 'America/Toronto').format(format);
}

/**
 * datapointDateUTC - Description
 *
 * @param {type} date Description
 *
 * @return {type} Description
 */
export function datapointDateUTC(date, format = 'DD-MMM-YYYY') {
  return moment.utc(date).tz('America/Toronto').format(format);
}

/**
 * datapointDateAsUTC - Description
 *
 * @param {type}   date                 Description
 * @param {string} [format=DD-MMM-YYYY] Description
 *
 * @return {type} Description
 */
export function datapointDateAsUTC(date, format = 'DD-MMM-YYYY') {
  return moment.utc(date).format(format);
}

/**
 * [datapointDateTimeUTC description]
 * @param  {[type]} date   [description]
 * @param  {String} [format=h:mma DD-MMM-YYYY] [description]
 * @return {[type]}        [description]
 */
export function datapointDateTimeUTC(date, format = 'h:mma DD-MMM-YYYY') {
  return moment.utc(date).tz('America/Toronto').format(format);
}

/**
 *
 *
 * @export
 * @param {any} time
 * @returns
 */
export function parseTime(time) {
  return /^(0?[1-9]|1[012])(?::([0-5][0-9](:[0-5][0-9])?))?\s*([aApP][mM])$/gi.exec(
    time
  );
}
