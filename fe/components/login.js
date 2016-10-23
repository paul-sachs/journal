import React from 'react';
import auth from '../util/auth';

export default () =>
  <div>
    <h2>Login</h2>
    <button onClick={auth.login.bind(this)}>Login</button>
  </div>;