const React = require("react");
const ReactDOM = require("react-dom");

const Environment = require("./components/environment.jsx");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Environment/>, root);

});
