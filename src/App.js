import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import './App.css';
const app = new Clarifai.App({
 apiKey: 'eb69f42fe4ed464abe5be47650d4aa7f'
});
const particlesOptions={
                particles: {
                  number:{
                    value:90, 
                    density:{
                      enable:true,
                      value_area:500 
                    }
                  }
                }
              }
class App extends Component {
  constructor()
  {


  super();
  
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        name:'',
        email:'',
        password:''
      }

    }
  
}
loadUser=(data)=>{
  this.setState({user:
    
    {name:data.name,
      email:data.email,
    password:data.passoword

    }})
  
}
calculateFaceLocation=(data)=>{

 const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;

 const image=document.getElementById('inputimage');
 const width=Number(image.width);
 const height=Number(image.height);
 return{
leftCol:clarifaiFace.left_col*width,
topRow:clarifaiFace.top_row*height,
rightCol:width-(clarifaiFace.right_col*width),
bottomRow:height-(clarifaiFace.bottom_row*height)



  }
}
displayFaceBox=(box)=>{
  
  this.setState({box:box});

}

OnInputChange=(event)=>{
  this.setState({input:event.target.value});


}
OnButtonSubmit=()=>{
 this.setState({imageUrl:this.state.input});
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    res=> {
      const face=this.calculateFaceLocation(res);
      this.displayFaceBox(face);
      // do something with response
     // console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
}
OnRouteChange=(route)=>{
  if(route==='signout')
    this.setState({isSignedIn:false});
   else if(route==='home')
    this.setState({isSignedIn:true});
  this.setState({route:route});
}
  render() {
    return (
      <div className="App">
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation isSignedIn={this.state.isSignedIn} OnRouteChange={this.OnRouteChange}/>
      {this.state.route==='home'?

      <div>
      <Logo/>
      <ImageLinkForm OnInputChange={this.OnInputChange}
       OnButtonSubmit={this.OnButtonSubmit}/>
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div>:
       (
       this.state.route==='signin'?
       <SignIn OnRouteChange={this.OnRouteChange}/>:
       <Register loadUser={this.loadUser} OnRouteChange={this.OnRouteChange}/>

       )

      
      }
     

      </div>
    

    );
  
}}

export default App;