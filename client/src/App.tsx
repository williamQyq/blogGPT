import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogView from './component/Blog/Blog.view';
import PrivateRouteControl from './controller/control/PrivateRoute.control';
import './App.css';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      < Routes >
        <Route path="/" element={<BlogView />} />

        {/* <Route
          path="/app/*"
          element={
            <PrivateRouteControl isAuthenticated={false}>
              <BlogView />
            </PrivateRouteControl>
          }
        /> */}
      </Routes >
    </Router>
  );
}

export default App;
