import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
const Errror = () => {


    const history = useNavigate();

  return (
    <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height:'90vh' , flexDirection:'column'}}>
            <div  >
                {/* <img src="./404.png" alt="error" className='errorimg' /> */}
                <h1>404 Error ! Page Not Found 😭</h1>
               
            </div>
            <div style={{display: "flex", alignItems: "left",}}>
            <Button variant="contained" onClick={()=>history("/")}>Back</Button>
              </div>
        </div>
    </>
  )
}

export default Errror