import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

/**
 * Головний компонент додатку.
 * Рендерить HomePage і монтує додаток у DOM.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 */

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <HomePage />
      </div>
      
    );
    
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);