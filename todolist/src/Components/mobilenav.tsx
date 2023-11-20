import {Drawer,Box} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react";


export default function Mobilenav() {
   const [openDrawer,setOpenDrawer] = useState(false);

    return (
      <div className="navbar">
      <div className="icon">
        {" "}
        <button>Todoer</button>
      </div>
  
      <div className="hamburger" >
        {/* <IconButton size="large" edge='start' color='inherit' aria-label='logo' onClick={()=>{setOpenDrawer(true)}}>
          
        </IconButton> */}
        
        <button className="hamburgerbut" onClick={()=>{setOpenDrawer(true)}}>
          <MenuIcon />
        </button>
        <Drawer anchor="right"  open={openDrawer} onClose={()=>{setOpenDrawer(false)}}>
          <Box p={2} width="250px">
        <div className="panelBox">            <button className="panelBut">Features</button>
        <button className="panelBut">For Teams</button>
        <button className="panelBut"> Resources</button>
        <button className="panelBut">Pricing</button>
          <a href="/login" className="panelBut" style={{gridRow:"7"}}>Login</a>
          <a href="/sign" className="panelBut sign" style={{gridRow:"8"}}>Sign</a>
        
        </div>
          </Box>
        </Drawer> 
      
        {/* <button className="navBut">Features</button>
        <button className="navBut">For Teams</button>
        <button className="navBut"> Resources</button>
        <button className="navBut">Pricing</button>
        <div>This is mobile</div>
        <a href="/login"><button style={{padding:'10px'}} className="navBut">Login</button></a>
        <a href="/sign"><button id="sign">Sign in</button></a> */}
      </div>
    </div>
    );
  }
  