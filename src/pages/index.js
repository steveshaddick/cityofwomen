/**
 *
 *
 * @export
 * @param {any} template
 * @param {any} done
 */
export default function loadTemplate(template, done) {
  switch (template) {
    //
    default:
      require.ensure(
        [],
        require => {
          done(null, require('./AboutPage/index.jsx').default);
        },
        'Pages/AboutPage'
      );
      break;
  }
}
