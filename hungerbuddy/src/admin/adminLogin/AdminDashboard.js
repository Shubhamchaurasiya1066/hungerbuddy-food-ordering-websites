import { Button,Grid,AppBar,Toolbar,Avatar, ListItemButton, Divider } from "@mui/material"
import { NavigationType,useNavigate } from "react-router-dom"
import { serverURL } from "../../services/FetchNodeServices"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import dashboard from '../../assets/dashboard.png'
import branchimg from "../../assets/branch.png"
import batchimg from "../../assets/batch.png"
import sectionimg from "../../assets/section.png"
import studentimg from "../../assets/student1.png"
import employeeimg from "../../assets/employee.png"
import deliveryimg from "../../assets/delivery.png"
import logout from '../../assets/check-out.png'
import order from '../../assets/order.png'
import Branch from "../branch/branch"
import Batch from "../batch/batch"
import Section from "../section/Section"
import StudentInterface from "../students/StudentInterface"
import DisplayStudent from "../students/DisplayStudent"
import EmployeeInterface from "../employee/EmployeeInterface"
import DisplayEmployee from "../employee/DisplayEmployee"
import DeliveryInterface from "../deliveryboy/DeliveryBoyInterface"
import DisplayDelivery from "../deliveryboy/DisplayDeliveryboy"
import { Route,Routes } from "react-router-dom";
import ListItemAvatar from '@mui/material/ListItemAvatar';
export default function AdminDashboard(){
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
      <ListItemButton onClick={()=>navigate('/admindashboard/branch')}>
        <ListItemAvatar>
           <Avatar
              src={branchimg} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand',width:120}}>Branch</div>}/>
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/admindashboard/batch')}>
        <ListItemAvatar>
          <Avatar
              src={batchimg} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Batch</div>} />
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/admindashboard/section')}>
        <ListItemAvatar>
           <Avatar
              src={sectionimg} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Section</div>}/>
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/admindashboard/displaystudent')}>
        <ListItemAvatar>
           <Avatar
              src={studentimg} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Students</div>}/>
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/admindashboard/displayemployee')}>
        <ListItemAvatar>
           <Avatar
              src={employeeimg} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Employees</div>}/>
      </ListItemButton>
      <ListItemButton onClick={()=>navigate('/admindashboard/displaydelivery')}>
        <ListItemAvatar>
           <Avatar
              src={deliveryimg} variant='rounded' sx={{width:28,height:28}}
              />
        </ListItemAvatar>
        <ListItemText primary={<div style={{fontFamily:'Quicksand'}}>Delivery</div>}/>
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
          <Route element={<Branch/>} path="/branch"/>
          <Route element={<Batch/>} path="/batch"/>
          <Route element={<Section/>} path="/section"/>
          <Route element={<StudentInterface />} path="/student" />
          <Route element={<DisplayStudent />} path="/displaystudent" />
          <Route element={<EmployeeInterface />} path="/employee" />
          <Route element={<DisplayEmployee />} path="/displayemployee" />
          <Route element={<DeliveryInterface />} path="/delivery" />
          <Route element={<DisplayDelivery />} path="/displaydelivery" />

         </Routes>
        </Grid>
      </Grid>
    </div>)
}