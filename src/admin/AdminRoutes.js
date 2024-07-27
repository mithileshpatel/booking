import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const AdminRoutes = () => {
  return (
    <Switch>
      <Route path="/admin" component={AdminLogin} />
      {/* Other admin routes can be added here */}
    </Switch>
  );
};

export default AdminRoutes;
