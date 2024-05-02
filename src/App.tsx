import React from "react";
import "./App.css";
import { RendererProvider, FluentProvider } from "@fluentui/react-components";
import { createFluentRenderer, createThemes } from "./factories/fluent-ui";
import MainPage from "./pages/MainPage/MainPage";

const fluentRenderer = createFluentRenderer();
const theme = createThemes();

function App(): React.ReactElement {
  return (
    <RendererProvider renderer={fluentRenderer}>
      <FluentProvider theme={theme.light}>
        <div className="container">
          <MainPage />
        </div>
      </FluentProvider>
    </RendererProvider>
  );
}

export default App;
