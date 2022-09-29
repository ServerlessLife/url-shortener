import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function encodeUrl() {
    if (!url) {
      alert("Invalid input!");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/encode`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ url }),
    });

    const id = (await response.json())?.id;

    setPrevUrl(url);
    setUrl("");
    setShortUrl(`${process.env.REACT_APP_API_URL}/${id}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Url Shortener</h1>
        <input onChange={(e) => setUrl(e.target.value)}></input>
        <button onClick={encodeUrl}>Create short URL</button>
        <br />
        {shortUrl && (
          <div>
            <p>Url</p>
            <p>
              <a href={prevUrl}>{prevUrl}</a>
            </p>
            <p>is shortened to </p>
            <p>
              <a href={shortUrl}>{shortUrl}</a>
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
