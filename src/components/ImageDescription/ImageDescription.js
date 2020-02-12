import React from 'react';
import { Typography} from '@material-ui/core';

const ImageDescription = ({modelType, colors}) => {

    const color = colors.map((color,i) => {
        return (
                <div key={i} style={{margin: '.5rem', borderRadius: '10px', border: '1px solid black', padding: '.5rem', textAlign: 'center'}}>
                    <div style={{margin: '0 auto', width: '50px', height: '50px', backgroundColor: `${color.w3c.hex}`, borderRadius: '10px', marginTop: '.5rem', marginBottom: '.5rem'}}></div>
                        {/* <Typography>Hex: {color.w3c.hex} </Typography>
                        <Typography>Color: {color.w3c.name}  </Typography> */}
                        <Typography>Image Value {Math.floor((Number(color.value) * 100))} % </Typography>
                </div>
        )
    })

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
            <Typography variant='h6'>Image Model Description</Typography>
            <hr/>
            { modelType !== '' ? <Typography variant='button'>Image Type: {modelType}</Typography>: ''}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
            
                <Typography variant='button'>Colors:</Typography>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {color}
                </div>
            </div>
        </div>
    )
}

export default ImageDescription
