import { h, render } from "preact";
import "./styles/shell.scss";

const root = document.getElementById("root");

const renderRoot = function() {
  const App = require("./views").default;
  render(<App />, root, root.firstElementChild);
};

renderRoot();

if (process.env.NODE_ENV === "production") {
  const offlineRuntime = require("offline-plugin/runtime");
  offlineRuntime.install({
    onUpdateReady() {
      // update immediately
      offlineRuntime.applyUpdate();
    },
    onUpdated: () => {
      const event = new Event("app:update");
      document.dispatchEvent(event);
    }
  });
} else {
  require("preact/devtools");

  // listen for HMR
  if (module.hot) {
    module.hot.accept("./views", renderRoot);
  }
}
