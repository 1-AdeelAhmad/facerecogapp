import React from 'react';
import { Typography } from '@material-ui/core';
import './faceBox.css'

const ImageSample = ({ imageURL, box }) => {

    const faceBox = box.map( (points,i) => {

        const image = document.getElementById('inputImage')
        const width = Number(image.width)
        const height = Number(image.height)

        return (
            <div key={i}
                className='bounding-box'
                style={{
                    top: points.top_row * height,
                    right: width - (points.right_col * width),
                    bottom: height - (points.bottom_row * height),
                    left: points.left_col * width
                }}>
            </div>
        )
    })
    
     

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
            <Typography style={{marginBottom: '1rem'}} variant='h6'>Your Image</Typography>
            
            <div style={{position: 'relative'}} >
                <img 
                    id='inputImage'
                    style={{width: '70vw', height: 'auto', margin: '0 auto', borderRadius: '20px', border: '1px solid black'}}
                    alt='imagerecog' 
                    src={imageURL}/>
                {faceBox}
            </div>
        </div>
    )
}

export default ImageSample
