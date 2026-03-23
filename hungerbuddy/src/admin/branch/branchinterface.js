import { BorderTop, Email, Message } from "@mui/icons-material"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import burger from '../../assets/burger.png'
import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  box: {
    width: '76%',
    height: 'auto',
    border: '1px solid hsla(321, 41%, 24%, 1)',
    borderRadius: 5,
    margin: 10,
    paddingBottom: 8
  },
  heading: {
    width: '100%',
    height: 'auto',
    background: "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(0, 100%, 89%, 1) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  subTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',

  },
  titleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: 'white',

  },
  titleBox: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '30%', padding: 10
  }
}))
export default function BranchInterface({ refresh, setRefresh }) {
  var classes = useStyles()

  const [branchName, setBranchName] = useState('')
  const [address, setAddress] = useState('')
  const [latlong, setLatlong] = useState('')
  const [stateId, setStateId] = useState('')
  const [cityId, setCityId] = useState('')
  const [cityList, setCityList] = useState([])
  const [stateList, setStateList] = useState([])
  const [emailId, setEmailId] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [error, setError] = useState({})
  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }))
  }

   const handleStateChange = (e) => {
    setStateId(e.target.value)
    fetchAllCities(e.target.value)
  }

  


  const fetchAllStates = async () => {
    var res =await getData('statecity/fetch_states')
    setStateList(res.data)
    
  }

  const fetchAllCities = async (sid) => {
    var res =await postData('statecity/fetch_cities',{stateid:sid})
    setCityList(res.data)
  }
  useEffect(function () {
    fetchAllStates()
  }, [])
  const fillStates = () => {
    return stateList?.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
    })
  }

   const fillCities = () => {
    return cityList?.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    })
  }

  const validation = () => {
    var isError = false
    if (branchName.length == 0) {
      setError((prev) => ({ ...prev, 'branchName': 'Pls Input Branch Name...' }))
      isError = true
    }
    if (latlong.length == 0) {
      setError((prev) => ({ ...prev, 'latlong': 'Pls Input latlong...' }))
      isError = true
    }
    if (address.length == 0) {
      setError((prev) => ({ ...prev, 'address': 'Pls Input Address...' }))
      isError = true
    }
    if (stateId.length == 0) {
      setError((prev) => ({ ...prev, 'stateId': 'Pls Input State...' }))
      isError = true
    }
    if (cityId.length == 0) {
      setError((prev) => ({ ...prev, 'cityId': 'Pls Input City...' }))
      isError = true
    }
    if (emailId.length == 0) {
      setError((prev) => ({ ...prev, 'emailId': 'Pls Input Email Id...' }))
      isError = true
    }
    if (contactNumber.length == 0) {
      setError((prev) => ({ ...prev, 'contactNumber': 'Pls Input Contact Number...' }))
      isError = true
    }
    if (contactPerson.length == 0) {
      setError((prev) => ({ ...prev, 'contactPerson': 'Pls Input Contact Person...' }))
      isError = true
    }
    return isError
  }


const generatePassword=()=>{
  var sp=['@','#','!','$','&','1','2','3','4','5','6','7','8','9','0']
  var pwd=''
  for(var i=1;i<=8;i++)
  {
    var j=sp[parseInt(Math.random()*14)]
    pwd+=j
  }
  return pwd
}


  const handleClick = async () => {
    var error = validation()
    if (error == false) {


      // var formData=new FormData()

      // formData.append('branchname',branchName)
      // formData.append('Address',address)
      // formData.append('Latlong',latlong)
      // formData.append('State',state)
      // formData.append('City',city)
      // formData.append('Emailid',emailId)
      // formData.append('contactnumber',contactNumber)
      // formData.append('contactperson-',contactPerson)
      // // formData.append('categoryicon',categoryIcon.bytes)
      // formData.append('createddate',getDate())
      // formData.append('createdtime',getTime())
      // formData.append('userid','xxxxx')

      var body = { branchname: branchName, address: address, latlong: latlong, stateid: stateId, cityid: cityId, emailid: emailId, contactnumber: contactNumber, contactperson: contactPerson, createddate: getDate(), createdtime: getTime(), userid: 'xxxx',password:generatePassword() }
      var response = await postData('category/submit_branch', body)
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });

      }
      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response?.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        })
      }

    }
    setRefresh(!refresh)
  }

 
  return (
    <div className={classes.root}>

      <div className={classes.box}>

        <Grid container spacing={1}>
          <Grid size={12}>
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div className={classes.subTitleStyle}>HungerBuddy</div>
                <div className={classes.titleStyle}>New food branch</div>
              </div>
            </div>
          </Grid>


          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setBranchName(e.target.value)} fullWidth label='Branch Name'
                helperText={error.branchName}
                error={error.branchName}
                onFocus={() => handleError('branchName', '')}
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setLatlong(e.target.value)} fullWidth label='Latlong'
                helperText={error.latlong}
                error={error.latlong}
                onFocus={() => handleError('latlong', '')}
                size="small"
              />
            </div>
          </Grid>

          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setAddress(e.target.value)} fullWidth label='Address'
                helperText={error.address}
                error={error.address}
                onFocus={() => handleError('address', '')}
                size="small"
              />
            </div>
          </Grid>

          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <FormControl size="small" fullWidth>
                <InputLabel>State</InputLabel>
                <Select label="State" value={stateId} onChange={handleStateChange} >
                  <MenuItem>-Select State-</MenuItem>
                  {fillStates()}
                </Select>
              </FormControl>
              {/* <TextField onChange={(e) => setState(e.target.value)} fullWidth label='State'
                helperText={error.state}
                error={error.state}
                onFocus={() => handleError('state', '')}
              /> */}
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <FormControl size="small" fullWidth>
                <InputLabel>City</InputLabel>
                <Select label="City" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
                  <MenuItem>-Select City-</MenuItem>
                  {fillCities()}
                </Select>
              </FormControl>
             
              {/* <TextField onChange={(e) => setCityId(e.target.value)} fullWidth label='City'
                helperText={error.cityId}
                error={error.cityId}
                onFocus={() => handleError('cityId', '')}
                size="small"
              /> */}
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setEmailId(e.target.value)} fullWidth label='Email Id'
                helperText={error.emailId}
                error={error.emailId}
                onFocus={() => handleError('emailId', '')}
                size="small"
              />
            </div>
          </Grid>
          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setContactNumber(e.target.value)} fullWidth label='Contact Number'
                helperText={error.contactNumber}
                error={error.contactNumber}
                onFocus={() => handleError('contactNumber', '')}
                size="small"
              />
            </div>
          </Grid>

          <Grid size={3}>
            <div style={{ padding: '0px 5px 0px 5px' }}>
              <TextField onChange={(e) => setContactPerson(e.target.value)} fullWidth label='Contact Person'
                helperText={error.contactPerson}
                error={error.contactPerson}
                onFocus={() => handleError('contactPerson', '')}
                size="small"
              />
            </div>
          </Grid>


          <Grid size={6}>

            <div style={{ padding: '0px 5px 0px 5px' }}>
              <Button onClick={handleClick} fullWidth variant="contained" style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                Save
              </Button>
            </div>

          </Grid>
          <Grid size={6}>

            <div style={{ padding: '0px 5px 0px 5px' }}>
              <Button fullWidth variant="contained" style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                Clear
              </Button>
            </div>

          </Grid>

        </Grid>

      </div>

    </div>)
}