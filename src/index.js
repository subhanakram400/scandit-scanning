import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
const configurationPromise = configure(
  "AWjR3j7JH1suKd4clyAclO0HPe0zPEMNZCprwe1JDiPDZqVxh3WP/TNdGR2AGa1FHUnH18pkL5gDR9cFNDj8+j0htvNmR7H4mS4ww7xeZhZWLwbCIAYATEo0SvXfFP/bMLSmKCui6U1P/EKatMf20L4D6YPVewPnS99PsEd4UL0g2rqEoKXkqbyAG1T/9wazd0SO41VbzubCmaDxDdu9jxtzO0vwyX5/tNjZPzWfUzoooxUqeYJ0U/RvclmblC+0twatbt8wlgOejEVgS+q/PmDlwKvocJx/tyi3Kkzq1R4VcnF2yTF/EX37cnJCrBUlU/I91FLtbG/9ShZ67bPj76zGxwMMwmt7wb2UA0KVy6vCy1UOtty5mh3gROQ5ZsBvHglNt1AGXMiD51xlSeWyAZxCsh1AB6q06m26vHF+gGdVm4BZVJgySqONR9IcrWdjogPIKN9dZ22GCQFDo8SVpkvmy3VWIrtvxz931QfSyYxVE6e55QyPyWduipjnNnOZm41q8/H6c3OGb+MWRZyRNZz3GNwDO514lippMMJX3sz93I8kDILhJjDeesohBB6GlZetDUbqrhj3xbnBy7oBtzrzDS/Fof3AU3QZ4F34NeOKtMOPD1N6ELa7E1i3kMpNQzoRymmw1R+wgeQfjwgKunrqo/qKC4Bc+z/EmBmcaENYQ80GW312MqW/hqECI7mj+Pu2dVxRtxTf4ZNig1qzCDEBYl+huO5CNU6mJ0fGCrQI6SVFQzLNC+o0qys+zy8aIqpCil4+i3TebKH4qiNOxtZTwyYAAbpq9ygSJzWhgg==",
  {
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
    loadTextRecognition: true,
  }
).catch((error) => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%",
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    configurationPromise.then(() => {
      ScanditSDKBarcodePicker.create(this.ref.current, this.props).then((barcodePicker) => {
        this.barcodePicker = barcodePicker;
        if (this.props.onScan != null) {
          barcodePicker.on("scan", this.props.onScan);
        }
        if (this.props.onError != null) {
          barcodePicker.on("scanError", this.props.onError);
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;
