import { Button,Grid,AppBar,Toolbar,Avatar, ListItemButton, Divider } from "@mui/material"
import { NavigationType,useNavigate } from "react-router-dom"
import { serverURL } from "../../services/FetchNodeServices"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import dashboard from '../../assets/dashboard.png'
import cutlery from '../../assets/cutlery.png'
import fooditems from '../../assets/masala-dosa.png'
import logout from '../../assets/check-out.png'
import order from '../../assets/order.png'
import Category from "../category/category";
import DisplayFoodItem from "../fooditem/DisplayFoodItem";
import FoodItems from "../fooditem/FoodIems";
import { Route,Routes } from "react-router-dom";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PictureInterface from "../morepicture/PictureInterface";
export default function BranchDashboard(){
    var navigate=useNavigate()
    const handleClick=()=>{
      navigate('/category')

    }
     const handleLogout=()=>{
      localStorage.removeItem('Token')

    }

    const sideBar=()=>{
   return(<div style={{background:'hsla(324,48%,94%,1.00)',margin:10,borderRadius:5,height:'75%',width:210}}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItemButton >
              <ListItemAvatar>
              <Avatar
              src={dashboard} variant='rounded' sx={{width:28,height:28}}
              />
                
             
              </ListItemAvatar>
                <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Dashboard</div>}/>
              
            </ListItemButton>
            <Divider/>
      <ListItemButton onClick={()=>navigate('/branchdashboard/category')}>
        <ListItemAvatar>
           <Avatar
              src={cutlery} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand',width:120}}>Food Category</div>}/>
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/branchdashboard/fooddisplay')}>
        <ListItemAvatar>
          <Avatar
              src={fooditems} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Food Items</div>} />
      </ListItemButton>
      <ListItemButton>
        <ListItemAvatar>
           <Avatar
              src={order} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Orders</div>}/>
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/branchdashboard/pictureinterface')}>
        <ListItemAvatar>
           <Avatar
              src={order} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>More Picture</div>}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemAvatar>
           <Avatar
              src={logout} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Logout</div>} />
      </ListItemButton>
    </List>

   </div>)
    }

    return(<div style={{display:'flex',flexDirection:'column'}}>
      <AppBar position="static">
        <Toolbar style={{background:"hsla(321, 41%, 24%, 1)"}}>
          <div style={{fontSize:22}}>
            HungerBuddy
          </div>
          <Avatar
            alt="Remy Sharp"
            src={`${serverURL}/images/1.jpg`}
            style={{ width: 50, height: 50,marginLeft:'auto' }}
/>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1}>
        <Grid size={2} style={{height:'100vh'}}>
          {sideBar()}
        </Grid>
        <Grid size={10}>
         <Routes>
          <Route element={<Category/>} path="/category"/>
          <Route element={<DisplayFoodItem/>} path="/fooddisplay"/>
          <Route element={<FoodItems/>} path="/fooditem"/>
          <Route element={<PictureInterface/>} path="/pictureinterface"/>
         </Routes>
        </Grid>
      </Grid>
    </div>)
}