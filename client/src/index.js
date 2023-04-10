import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SearchContextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SearchContextProvider>
        <App />
    </SearchContextProvider>
);

