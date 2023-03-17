import React, { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <Router>
      <Suspense fallback={<div className="TODO" />}>{component()}</Suspense>
    </Router>
  );
