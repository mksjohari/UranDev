import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import reducers from './reducers';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DimsProvider } from './shared/react-dims';
import { createStore, compose, applyMiddleware } from 'redux';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<DimsProvider>
				<App />
			</DimsProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
