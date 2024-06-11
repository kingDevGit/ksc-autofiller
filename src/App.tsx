/*global chrome*/
import React, { useEffect } from "react";
import "./App.css";
import { RendererProvider, FluentProvider } from "@fluentui/react-components";
import { createFluentRenderer, createThemes } from "./factories/fluent-ui";
import AppRouter from "./router/AppRouter";

const fluentRenderer = createFluentRenderer();
const theme = createThemes();

function App(): React.ReactElement {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (chrome.tabs) {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          const port = chrome.tabs.connect(tabs[0].id ?? 0, {
            name: "KSC_PLUGIN",
          });
          console.log("[ChromeService] Connected with port: ", port);
        }
      );
    }
  }, []);

  return (
    <RendererProvider renderer={fluentRenderer}>
      <FluentProvider theme={theme.light}>
        <div className="container">
          <AppRouter />
        </div>
      </FluentProvider>
    </RendererProvider>
  );
}

export default App;
