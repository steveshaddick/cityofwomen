import React from 'react';
import { Route } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import PageContainer from './containers/PageContainer';

/**
 *
 */

export default (
  <AppContainer>
    <Route path="*" component={PageContainer} />
  </AppContainer>
);
