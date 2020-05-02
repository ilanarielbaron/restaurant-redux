import React from "react";
import { render } from "render-dom";

function Hi() {
  return <p>Hi.</p>;
}

render(<Hi />, document.getElementById("app"));
