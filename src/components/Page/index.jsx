import React, { Component } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import loadTemplate from '../../pages';

import './styles.styl';

/**
 *
 *
 * @export
 * @class Page
 * @extends {Component}
 */
export default class Page extends Component {
  /**
   *
   *
   * @readonly
   * @static
   *
   * @memberOf Page
   */
  static get propTypes() {
    return {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
        hash: PropTypes.string.isRequired,
        state: PropTypes.object,
      }).isRequired,

      isFetching: PropTypes.bool,

      currentPage: PropTypes.object,

      getPage: PropTypes.func,
    };
  }

  /**
   * Creates an instance of Page.
   *
   * @memberOf Page
   */
  constructor() {
    super();
    //
    this.state = {};
  }

  /**
   *
   *
   *
   * @memberOf Page
   */
  componentWillMount() {
    console.log('Page will mount', this.props);
    /*if (this.props.location) {
      const {
        location: { pathname },
        isFetching,
        currentPage,
        getPage,
      } = this.props;

      if (!isFetching && !_.size(currentPage)) {
        //getPage(pathname);
      }
    }*/
  }

  /**
   *
   *
   * @param {any} nextProps
   *
   * @memberOf Page
   */
  componentWillReceiveProps(nextProps) {
    const {
      location: { pathname },
      isFetching,
      currentPage,
      getPage,
    } = nextProps;

    console.log('Page will receive props', nextProps);

    // const { location: { pathname: currentPathname } } = this.props;

    if (_.size(currentPage)) {
      const { fields: { template } } = currentPage;
      if (template) {
        this.loadRoute(template, (err, Template) => {
          if (Template && !err) {
            this.setState({ Template }, () => this.pageDidLoad());
          }
        });
      }
    } else if (
      !isFetching &&
      !_.size(currentPage) &&
      this.state.fetched !== pathname
    ) {
      this.setState({ fetched: pathname }, () => {
        getPage(pathname);
        this.pageWillChange(pathname);
      });
    } else {
      this.setState({ Template: null });
    }
  }

  /**
   *
   *
   *
   * @memberOf Page
   */
  pageDidLoad() {}

  /**
   *
   *
   *
   * @memberOf Page
   */
  pageWillChange() {
    window.scrollTo(0, 0);
    const skips = document.getElementsByClassName('skip');
    if (skips.length > 0) {
      skips[0].focus();
    }
  }

  /**
   *
   *
   * @param {any} error
   *
   * @memberOf Page
   */
  errorLoading(error) {
    throw new Error(`Dynamic page loading failed: ${error}`);
  }

  /**
   *
   *
   * @param {any} cb
   * @returns
   *
   * @memberOf Page
   */
  loadRoute(template, done) {
    console.log('loading template', template, done);
    loadTemplate(template, done);
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf Page
   */
  render() {
    const { currentPage, isFetching } = this.props;
    const { Template } = this.state;

    console.log('rendering Page');

    if (Template) {
      return <Template />;
    } else if (isFetching || (currentPage && !Template)) {
      return (
        <div data-component="Page" className="wait">
          <div className="progress-container text-center">
            {/*<img src={PreloadImage} style={{ width: '80px' }} />*/}
            loading
          </div>
        </div>
      );
    } else {
      return (
        <div data-component="Page" className="error">
          {/*<FourOhFour />*/}
          404
        </div>
      );
    }
  }
}
