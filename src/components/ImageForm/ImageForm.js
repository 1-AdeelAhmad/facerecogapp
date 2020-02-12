import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));

const ImageForm = ({ onInputChange, onButtonSubmit }) => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
        <Typography style={{marginTop: '1rem', textAlign: 'center'}} >This App Will Detect Faces & Colours In Your Image Using The Clarifai API.</Typography> 
        <Typography style={{marginTop: '2rem'}}>Enter A URL and hit 'Detect'</Typography>
      <TextField style={{marginTop: '1rem', width: '70vw'}} id="standard-basic" label="Image Link" onChange={onInputChange} required/>
      <Button style={{marginTop: '1rem', marginBottom: '1rem'}} variant="contained" onClick={onButtonSubmit}>Detect</Button>
    </form>
  );
};

export default ImageForm;