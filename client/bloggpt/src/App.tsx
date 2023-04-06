import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogView from './component/Blog/Blog.view';
import ProLoginView from './component/Login/ProLogin.view';
import PrivateRouteControl from './controller/control/PrivateRoute.control';

function App() {
  return (
    <Router>
      < Routes >
        <Route path="/" element={<BlogView />} />
        <Route path='/login' element={<ProLoginView />} />

        <Route
          path="/app/*"
          element={
            <PrivateRouteControl isAuthenticated={false}>
              <BlogView />
            </PrivateRouteControl>
          }
        />
      </Routes >
    </Router>
  );
}

export default App;
