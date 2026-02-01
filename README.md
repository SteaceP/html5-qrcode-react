# html5-qrcode with React, Vite & TypeScript
<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEuMiIgZmlsbD0ibm9uZSI+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiLz4KICAgIDxlbGxpcHNlIHJ4PSIxMSIgcnk9IjQuMiIgdHJhbnNmb3JtPSJyb3RhdGUoNjApIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDEyMCkiLz4KICA8L2c+Cjwvc3ZnPgo=" width="200px"><br>
[react.dev](https://react.dev/) | `Vite` | `TypeScript` | `React 19`

Modern example of using [mebjas/html5-qrcode](https://github.com/mebjas/html5-qrcode) in a React project, migrated to **Vite**, **TypeScript**, and **React 19**.

## Getting Started

### Installation
```bash
npm install html5-qrcode
```

### Create the Component `Html5QrcodePlugin.tsx`
This plugin encapsulates the scanner logic. See [src/Html5QrcodePlugin.tsx](./src/Html5QrcodePlugin.tsx) for the full implementation.

```tsx
import { Html5QrcodeScanner, QrcodeSuccessCallback, QrcodeErrorCallback } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number | { width: number, height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: QrcodeSuccessCallback;
    qrCodeErrorCallback?: QrcodeErrorCallback;
}

const Html5QrcodePlugin = ({
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    verbose,
    qrCodeSuccessCallback,
    qrCodeErrorCallback
}: Html5QrcodePluginProps) => {

    useEffect(() => {
        const config = { fps, qrbox, aspectRatio, disableFlip };
        const isVerbose = verbose === true;

        if (!qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is required callback.");
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, isVerbose);
        html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [fps, qrbox, aspectRatio, disableFlip, verbose, qrCodeSuccessCallback, qrCodeErrorCallback]);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
```

### Usage in `App.tsx`
```tsx
import { useState } from 'react';
import { Html5QrcodeResult } from 'html5-qrcode';
import Html5QrcodePlugin from './Html5QrcodePlugin';

const App = () => {
    const [results, setResults] = useState<Html5QrcodeResult[]>([]);

    const onNewScanResult = (_decodedText: string, decodedResult: Html5QrcodeResult) => {
        setResults((prev) => [...prev, decodedResult]);
    };

    return (
        <div className="App">
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
            {/* Render results list here */}
        </div>
    );
};
```

### Additional Contributors
| Name | Profile|
| ----- | ------ |
| Steacy Paquette [@SteaceP](https://github.com/SteaceP) |
| Andy Tenholder| [@AndyTenholder](https://github.com/AndyTenholder) |
| Minhaz | [@mebjas](https://github.com/mebjas) |
| Mohit Tank| [@tankmohit](https://github.com/tankmohit) |

### Credits
 - [scanapp.org](https://scanapp.org) - Free online barcode and qrcode scanner.
 - [html5-qrcode](https://github.com/mebjas/html5-qrcode) - The core library.
