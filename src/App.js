import "./App.css";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer></Timer>
      </header>
      <footer className="App-footer">
        <p>
          Desarrollado por{" "}
          <a
            href="https://www.linkedin.com/in/lucas-barbosa/"
            target={"_blank"}
            rel="noreferrer"
          >
            Lucas Barbosa
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
