import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate  persistor={persistor}> {/* loading={<LoadingView />} */}
        <App  />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
