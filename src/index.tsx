import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
