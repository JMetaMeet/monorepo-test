import React from "react";
import logo from "./logo.svg";
import "./App.css";

const Play = React.lazy(() => import("Play/Play"));

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn MFE
                    <React.Suspense fallback="Loading">
                        <Play />
                    </React.Suspense>
                </a>
            </header>
        </div>
    );
}

export default App;
