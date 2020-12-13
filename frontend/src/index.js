import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./scss/main.scss";
import reducer from "./app/store/rootReducer";

import App from "./app/App";

import reportWebVitals from "./reportWebVitals";

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
		: compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

reportWebVitals();
