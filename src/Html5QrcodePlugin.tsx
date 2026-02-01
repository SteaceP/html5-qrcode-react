import {
  Html5QrcodeScanner,
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
} from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

export interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number | { width: number; height: number };
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback?: QrcodeErrorCallback;
  videoConstraints?: MediaTrackConstraints;
  rememberLastUsedCamera?: boolean;
  supportedScanTypes?: Array<number>;
}

type ScannerConfigProps = Omit<
  Html5QrcodePluginProps,
  "qrCodeSuccessCallback" | "qrCodeErrorCallback" | "verbose"
>;

const createConfig = ({
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  videoConstraints,
  rememberLastUsedCamera,
  supportedScanTypes,
}: ScannerConfigProps) => {
  let config: any = {};
  if (fps) config.fps = fps;
  if (qrbox) config.qrbox = qrbox;
  if (aspectRatio) config.aspectRatio = aspectRatio;
  if (disableFlip !== undefined) config.disableFlip = disableFlip;
  if (videoConstraints) config.videoConstraints = videoConstraints;
  if (rememberLastUsedCamera !== undefined)
    config.rememberLastUsedCamera = rememberLastUsedCamera;
  if (supportedScanTypes) config.supportedScanTypes = supportedScanTypes;
  return config;
};

const Html5QrcodePlugin = ({
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
  verbose,
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  videoConstraints,
  rememberLastUsedCamera,
  supportedScanTypes,
}: Html5QrcodePluginProps) => {
  useEffect(() => {
    const config = createConfig({
      fps,
      qrbox,
      aspectRatio,
      disableFlip,
      videoConstraints,
      rememberLastUsedCamera,
      supportedScanTypes,
    });
    const isVerbose = verbose === true;

    if (!qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required callback.");
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      isVerbose,
    );
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    videoConstraints,
    rememberLastUsedCamera,
    supportedScanTypes,
    qrCodeSuccessCallback,
    qrCodeErrorCallback,
    verbose,
  ]);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
