import React from "react";
import { Html5QrcodeResult } from "html5-qrcode";

interface ResultContainerTableProps {
  data: Html5QrcodeResult[];
}

const ResultContainerTable: React.FC<ResultContainerTableProps> = ({
  data,
}) => {
  return (
    <table className={"Qrcode-result-table"}>
      <thead>
        <tr>
          <td>#</td>
          <td>Decoded Text</td>
          <td>Format</td>
        </tr>
      </thead>
      <tbody>
        {data.map((result: Html5QrcodeResult, i: number) => {
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{result.decodedText}</td>
              <td>{result.result?.format?.formatName || "Unknown"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface ResultContainerPluginProps {
  results: Html5QrcodeResult[];
}

const ResultContainerPlugin: React.FC<ResultContainerPluginProps> = ({
  results,
}) => {
  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({results.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={results} />
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
