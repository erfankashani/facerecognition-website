import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ba1202780d5d42398b992bdbef41f5f3'
});

const ParticlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      image_url: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    console.log(`this is data ${data}`);
    const ClarifiFace = data;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ClarifiFace.left_col * width,
      topRow: ClarifiFace.top_row * height,
      rightCol: width - (ClarifiFace.right_col * width),
      bottomRow: height - (ClarifiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box : box});
    console.log(this.state.box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({image_url: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {  
        console.log(response);
        return response.outputs[0].data.regions.map(face => {
          this.displayFaceBox(this.calculateFaceLocation(face.region_info.bounding_box));
        })
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (Route) => {
    if (Route === 'SignIn'){
      this.setState({isSignedIn: false})
    } else if (Route === 'Home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:Route});
  }

  render() {
    const { isSignedIn, box, image_url, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={ParticlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'Home'
          ? <div>
              <Logo />
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} ImageSource ={image_url}/>
            </div>
          :(
            route === 'SignIn'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  } 
}

export default App;
