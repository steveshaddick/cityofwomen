import PropTypes from 'prop-types';

//
export const locaionWithImage = PropTypes.shape({
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

//
export const simpleLocation = PropTypes.shape({
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  openTableId: PropTypes.string,
});
