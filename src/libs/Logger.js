import debug from 'debug';

/**
 *
 *
 * @export
 * @param {any} namespace
 * @returns
 */
export function Logger(namespace) {
  return {
    log: debug(`app:${namespace}`),
    error: debug(`app:${namespace}:error`),
  };
}

/**
 *
 *
 * @export
 * @param {any} obj
 * @returns
 */
export function logProxy(obj, ...args) {
  console.log(obj, ...args);
  return obj;
}
