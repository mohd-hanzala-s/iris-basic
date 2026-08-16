import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import Home from "../src/pages/Home";
try {
  const html = renderToString(
    React.createElement(MemoryRouter, { initialEntries: ["/"] },
      React.createElement(Home)
    )
  );
  console.log("OK length", html.length);
} catch (e: any) {
  console.log("FAIL", e.message);
}
