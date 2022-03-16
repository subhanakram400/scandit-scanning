import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
const configurationPromise = configure(
  "AfHhZmTJRbwJD5nCtCuWn3I14pFUOfSbXEMj5ZxgX2i8fgpb0GQIS8ZYvNQmP1bbIGOk3IwSWAoGY4x+aXMB5+Z3cTxHUZyA2T5GAXwx1zdUVkjnMWnIlJ1NVINKW7IGxDZPCCNsXmtbeWGZWHvQ1uAqZMgvbRIkilLDGpg9oIVmHmagsySTKA8s/gslZvdEDXa3hnhy6TLkLvFIfQUwJWOzvUsQ9KlUHGI3C6vsOKjS4vQts97feof//Y2a32MTotpOFfLn0x9eqBojPuEMQIPzDT+CbYHse2lh/xZ2TpmVIyjcFj6qvs1j8fvsS5WR8HMMr1kXCRRJYrNfOw3NxzLhsp37raOqz+NMNPVqaZb7qFzBQn53MfXynqywOlkVZPUdRxEj3saK1mgRZDDRBWLPBAUxXd41gBS5O+W18jC+lau9Jgxs5LyEcjOoZcXAHa2UnvgaGtd2W5wQYeIYWu4fUCAgH8obU65zij5piPl3lVIEfvVAZCJgU4MiqJdgqx/BbdvWl8I8dkqJ7bOZR2oG+ZfVigJriCJ5LFdPIW/GxUe+xvY82F3cRxrJ10NyjqgJ4zZSo86boH68JCG5Jjq8URod31xZPs2pPm2MtSdTmGAtuC+t8/z59fPMgsEPFvNWtbph+sNGPZ8zG/aEkx2md2yAidKKtwQAYN9AhTnSIWIG0tUTlT3wRX4M56Ag9OgVUm04wOfXHMzrNGWe0z61Ye9p8o6Oyi+LW5JHfov2IEynhCTVlYG/ArglBh9elMZEYHZEp9+z4K7apKPNg6KwXp0aH8XhLsKQcPPjMScJV9BPsDP2SrHo2mVKpWeJRM4Ew6hgrE5CY6xK1dUcnvJjDDhuEYhqVebpD4fq6TPCdlGQcwQZl+HKyA==",
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
