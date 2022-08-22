import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";

/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = false;

const title = "Rapyd Add-in";

const render = (Component, props) => {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider>
        <Component title={title} isOfficeInitialized={isOfficeInitialized} {...props} />
      </ThemeProvider>
    </AppContainer>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  // Get the initialization context (if present)
  (Office.context.mailbox.item as any).getInitializationContextAsync(function (asyncResult) {
    console.log(asyncResult);
    if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
      if (asyncResult.value != null && asyncResult.value.length > 0) {
        // The value is a string, parse to an object
        var context = JSON.parse(asyncResult.value);
        console.log(context);
        render(App, { data: context });
        // Do something with context
      } else {
        // Empty context, treat as no context
        render(App, {});
      }
    } else {
      if (asyncResult.error.code == 9020) {
        // GenericResponseError returned when there is
        // no context
        // Treat as no context
        render(App, {});
      } else {
        // Handle the error
      }
    }
  });
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp, {});
  });
}
