import React, { Fragment } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageForm from './components/ImageForm/ImageForm';
import ImageSample from './components/ImageSample/ImageSample';
import ImageDescription from './components/ImageDescription/ImageDescription';
import { Grid, Paper } from '@material-ui/core'
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'dc35407eeac045149df0601ce8c81558'
 });

 const INITIAL_STATE = {
      input: '',
      imageURL: '',
      box: [],
      modelType: '',
      colors: []
 }

class App extends React.Component {
  constructor(){
    super()
    this.state = {...INITIAL_STATE}
  }

  calculateFaceLocation = data => {
    const boxArray = []
    if(data.outputs[0].data.regions){ 
    data.outputs[0].data.regions.map( dataEntry => {
      return boxArray.push(dataEntry.region_info.bounding_box);
    })
    this.setState({
      modelType: data.outputs[0].model.name
    })
  }
    return boxArray
  }

  displayFaceBox = box => {
    this.setState({ box })
  }

  onInputChange = e => {
    this.setState({input: e.target.value})
  }

  faceDetect = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>  {
      console.log(response)
      this.displayFaceBox(this.calculateFaceLocation(response)) })
    .catch(err => console.log(err));
  }

  colorDetect = () => {
    app.models.predict(Clarifai.COLOR_MODEL, this.state.input)
    .then(response => {
      this.setState({colors: [...response.outputs[0].data.colors]})
    })
    .catch(err => console.log(err))
  }

  onButtonSubmit = e => {
    this.setState({
      imageURL: this.state.input,
      box: [],
      modelType: '',
      colors: []
    })
    this.faceDetect()
    this.colorDetect()
  }

  render(){
    return (
      <div>
        <Navigation/>
        <Grid container>
          <Grid item xs={12}>
              <Paper style={{margin: '1rem', padding: '1rem'}}>
                <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              </Paper>
            </Grid>
            { this.state.imageURL !== '' ?
            <Fragment>
              <Grid item md={6} xs={12}>
                <Paper style={{margin: '1rem', padding: '1rem'}}>
                  <ImageSample box={this.state.box} imageURL={this.state.imageURL}/>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12}>
                <Paper style={{margin: '1rem', padding: '1rem'}}>
                  <ImageDescription modelType={this.state.modelType} colors={this.state.colors}/>
                </Paper>
              </Grid>
            </Fragment> : '' }
        </Grid>
      </div>
    );
  }
}

export default App;
