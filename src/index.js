import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import Login from './Component/Login';
import Home from './Component/Home';


ReactDOM.render(  
     
     <BrowserRouter>
     <div>
       {/* `component` will render when `path` matches the user's location */}
       {/* `exact` makes it so it only renders if `path` matches exactly. */}
       {/* Otherwise, `HomePage` would render on "mysite.com/About" as well as "mysite.com/". */}
       <Route exact path="/" component={Login}/>
       <Route path="/home" component={Home}/>
     </div>
   </BrowserRouter>,

     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
