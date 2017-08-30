/**
 * youtubeParser - Description
 *
 * @param {type} url Description
 *
 * @return {type} Description
 */
export function youtubeUrlParser(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
}
