import _ from 'lodash';

/**
 * nodeId - Description
 *
 * @param {type} prefix Description
 *
 * @return {type} Description
 */
export function nodeId(prefix) {
  prefix = prefix ? `${prefix}_` : '';
  const identifier = (Date.now() + parseInt(_.uniqueId())).toString(16);
  return `${prefix}${identifier}`;
}
