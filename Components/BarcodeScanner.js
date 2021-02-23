import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import firebase from '../database/firebase'

var i;
class ProductScanRNCamera extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      isLoading: true,
      data: [],
      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      }
    };
  }
  componentDidMount() {
    
    firebase.database().ref('data').on('value', (snapshot) => {
      
      this.setState(()=> ({ data: snapshot.val(), loading: false}));
      
    });
  }

  onBarCodeRead(scanResult) {
    //console.warn(scanResult.type);
    //console.log(this.state.data[0].barcode)
    console.log(scanResult.data);
    /*if (scanResult.data != null) {
	if (!this.barcodeCodes.includes(scanResult.data)) {
	  this.barcodeCodes.push(scanResult.data);
	  console.warn('onBarCodeRead call');
	}
    }*/
    for(i = 0;i<this.state.data.length;i++){
if(scanResult.data == this.state.data[i].barcode){
  console.log('success');
  this.props.navigation.navigate('DetailScreen',{
    imageData: this.state.data[i].image,
    priceData: this.state.data[i].price,
    nameData: this.state.data[i].name,
    idData: this.state.data[i].id,
    priceData: this.state.data[i].price,
    quantityData: this.state.data[i].quantity,
    ratingData: this.state.data[i].rating,
    })
}

    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
	  <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
	</View>
	<View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { console.log('scan clicked'); }}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
           />
	</View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ProductScanRNCamera;