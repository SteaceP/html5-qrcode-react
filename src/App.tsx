import React, { useState } from "react";
import "./App.css";
import HowToUse from "./HowToUse";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import ResultContainerPlugin from "./ResultContainerPlugin";
import { Html5QrcodeResult } from "html5-qrcode";

const App = () => {
  const [decodedResults, setDecodedResults] = useState<Html5QrcodeResult[]>([]);
  const onNewScanResult = (
    _decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <div className="App">
      <section className="App-section">
        <div className="App-section-title"> Html5-qrcode React demo</div>
        <br />
        <br />
        <br />
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          rememberLastUsedCamera={true}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <ResultContainerPlugin results={decodedResults} />
        <HowToUse />
      </section>
    </div>
  );
};

export default App;
