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

const initialState = {
  input: '',
      image_url: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
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
    this.setState({box : box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({image_url: this.state.input});
    fetch('https://smartbrain-back-end.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {  
      if(response){
        fetch('https://smartbrain-back-end.herokuapp.com/image', {
          method: 'put',
          headers: { 'content-type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        }).then( response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        }).catch(err => console.log(err))
      }  

      return response.outputs[0].data.regions.map(face => {
        this.displayFaceBox(this.calculateFaceLocation(face.region_info.bounding_box));
      })
    }).catch(err => console.log(err));
  }

  onRouteChange = (Route) => {
    if (Route === 'SignIn'){
      this.setState(initialState)
    } else if (Route === 'Home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:Route});
  }

  updateUser = (data) => {
    const {id, name, email, entries, joined} = data;
    this.setState({user:{
      id: id,
      name: name,
      email: email,
      entries: entries,
      joined: joined
    }})
  }

  render() {
    const { isSignedIn, box, image_url, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={ParticlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'Home'
          ? <div>
              <Logo />
              <Rank userInfo = {user}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} ImageSource ={image_url}/>
            </div>
          :(
            route === 'SignIn'
              ? <SignIn onRouteChange={this.onRouteChange} updateSignedinUser={this.updateUser}/>
              : <Register updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  } 
}

export default App;
