import React, { Component } from "react";
import { render } from "react-dom";
import { ScanSettings, Barcode } from "scandit-sdk";
import * as ScanditSDK from "scandit-sdk";
import BarcodePicker from "../../src";

class Demo extends Component {
  render() {
    const mrtdRegex =
      /[AIC][A-Z0-9<]{29}\n[A-Z0-9<]{30}\n[A-Z0-9<]{30}\n?|[A-Z0-9<]{36}\n[A-Z0-9<]{36}\n?|P[A-Z0-9<]{43}\n[A-Z0-9<]{44}\n?|V[A-Z0-9<]{43}\n[A-Z0-9<]{44}\n?|V[A-Z0-9<]{35}\n[A-Z0-9<]{36}\n?|[A-Z0-9<]{7}<<\n[A-Z0-9<]{30}\n[A-Z0<]{30}\n?/;
    const textRecognitionSettings = new ScanditSDK.TextRecognitionSettings({
      regex: mrtdRegex,
    });

    return (
      <BarcodePicker
        playSoundOnScan={true}
        vibrateOnScan={true}
        scanSettings={
          new ScanditSDK.ScanSettings({
            recognitionMode: ScanditSDK.ScanSettings.RecognitionMode.TEXT,
            textRecognitionSettings: textRecognitionSettings,
          })
        }
        onScan={(scanResult) => {
          console.log("scan result", scanResult);
          document.getElementById("scandit-barcode-result").innerHTML = scanResult.barcodes.reduce(function (
            string,
            text
          ) {
            return string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + text.value + "<br>";
          },
          "");
        }}
        onError={(error) => {
          console.error("error >>>", error.message);
        }}
      />
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
