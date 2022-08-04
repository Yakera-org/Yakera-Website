import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.scss";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Environment from "./services/Environment";

if (Environment.getCurrentEnvironment() === "production") {
  Sentry.init({
    dsn: "https://f66de6b062154ac489849554d9cdd641@o1334116.ingest.sentry.io/6600283",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and l this.state.checkboxes.a == falseoad faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
