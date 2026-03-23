import React from 'react'
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, IconButton,FormControl,InputLabel,MenuItem,Select } from "@mui/material"
import Swal from 'sweetalert2';
import burger from '../../assets/burger.png'
import ClearIcon from '@mui/icons-material/Clear';

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
    margin: 10,
    padding: 10
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
export default function DisplayBranch({ refresh, setRefresh }) {
  var classes = useStyles()
  const [branchList, setBranchList] = useState([])
  const [open, setOpen] = useState(false)
  /***********Branch View*************/
  const [branchId, setBranchId] = useState('')
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


  /********state city */

  const handleStateChange = (e) => {
    setStateId(e.target.value)
    fetchAllCities(e.target.value)
  }




  const fetchAllStates = async () => {
    var res = await getData('statecity/fetch_states')
    setStateList(res.data)

  }

  const fetchAllCities = async (sid) => {
    var res = await postData('statecity/fetch_cities', { stateid: sid })
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


  /************state city */

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
      setError((prev) => ({ ...prev, 'state': 'Pls Input State...' }))
      isError = true
    }
    if (cityId.length == 0) {
      setError((prev) => ({ ...prev, 'city': 'Pls Input City...' }))
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

  // const[categoryIcon,setCategoryIcon]=useState({bytes:'',fileName:burger})
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

      var body = { branchid: branchId, branchname: branchName, address: address, latlong: latlong, stateid: stateId, cityid: cityId, emailid: emailId, contactnumber: contactNumber, contactperson: contactPerson, createddate: getDate(), createdtime: getTime(), userid: 'xxxx' }
      var response = await postData('category/edit_branch', body)
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 3000,
          toast: true
        });
        setOpen(false)
        fetchAllBranch()

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
        setOpen(false)
        fetchAllBranch()
      }

    }
  }
  useEffect(() => {
    fetchAllBranch()
  }, [refresh])

  const showBranchInterface = () => {
    return (


      <Grid container spacing={1}>
        <Grid size={12}>
          <div className={classes.heading}>
            <div className={classes.titleBox}>
              <div className={classes.subTitleStyle}>HungerBuddy</div>
              <div className={classes.titleStyle}>New food branch</div>
            </div>
          </div>
        </Grid>


        <Grid size={6}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setBranchName(e.target.value)} fullWidth label='Branch Name'
              value={branchName}
              helperText={error.branchName}
              error={error.branchName}
              onFocus={() => handleError('branchName', '')}
            />
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setLatlong(e.target.value)} fullWidth label='Latlong'
              value={latlong}
              helperText={error.latlong}
              error={error.latlong}
              onFocus={() => handleError('latlong', '')}
            />
          </div>
        </Grid>

        <Grid size={12}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setAddress(e.target.value)} fullWidth label='Address'
              value={address}
              helperText={error.address}
              error={error.address}
              onFocus={() => handleError('address', '')}
            />
          </div>
        </Grid>

        <Grid size={6}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <FormControl size="small" fullWidth>
              <InputLabel>State</InputLabel>
              <Select label="State" value={stateId} onChange={handleStateChange} >
                <MenuItem>-Select State-</MenuItem>
                {fillStates()}
              </Select>
            </FormControl>
            {/* <TextField onChange={(e) => setStateId(e.target.value)} fullWidth label='State'
              value={stateId}
                helperText={error.stateId}
                error={error.stateId}
                onFocus={() => handleError('stateId', '')}
              /> */}
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <FormControl size="small" fullWidth>
              <InputLabel>City</InputLabel>
              <Select label="City" value={cityId} onChange={(e) => setCityId(e.target.value)}>
                <MenuItem>-Select City-</MenuItem>
                {fillCities()}
              </Select>
            </FormControl>

            {/* <TextField onChange={(e) => setCityId(e.target.value)} fullWidth label='City'
              value={cityId}
                helperText={error.cityId}
                error={error.cityId}
                onFocus={() => handleError('cityId', '')}
              /> */}
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setEmailId(e.target.value)} fullWidth label='Email Id'
              value={emailId}
              helperText={error.emailId}
              error={error.emailId}
              onFocus={() => handleError('emailId', '')}
            />
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setContactNumber(e.target.value)} fullWidth label='Contact Number'
              value={contactNumber}
              helperText={error.contactNumber}
              error={error.contactNumber}
              onFocus={() => handleError('contactNumber', '')}
            />
          </div>
        </Grid>

        <Grid size={6}>
          <div style={{ padding: '0px 5px 0px 5px' }}>
            <TextField onChange={(e) => setContactPerson(e.target.value)} fullWidth label='Contact Person'
              value={contactPerson}
              helperText={error.contactPerson}
              error={error.contactPerson}
              onFocus={() => handleError('contactPerson', '')}
            />
          </div>
        </Grid>


        <Grid size={6}>

          <div style={{ padding: '0px 5px 0px 5px' }}>
            <Button onClick={handleClick} fullWidth variant="contained" style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
              Edit
            </Button>
          </div>

        </Grid>
        <Grid size={6}>

          <div style={{ padding: '0px 5px 0px 5px' }}>
            <Button fullWidth variant="contained" style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
              Delete
            </Button>
          </div>

        </Grid>

      </Grid>

    )
  }

  /************************/
  const fetchAllBranch = async () => {
    var response = await getData('category/fetch_all_branch')
    setBranchList(response.data)

  }

  useEffect(function () {
    fetchAllBranch()
  }, [])

  const showDialog = () => {

    return (<div>
      <Dialog open={open}
        onClose={handleCloseDialog}
      >

        <div>
          <IconButton onClick={handleCloseDialog} aria-label="delete" style={{ display: 'flex', marginLeft: 'auto' }}>
            <ClearIcon />
          </IconButton>
        </div>


        <DialogContent>
          {showBranchInterface()}

        </DialogContent>
      </Dialog>

    </div>)
  }

  const handleOpenDialog = (rowData) => {
    fetchAllCities(rowData.stateid)
    setBranchId(rowData.branchid)
    setBranchName(rowData.branchname)
    setLatlong(rowData.latlong)
    setAddress(rowData.address)
    setStateId(rowData.stateid)
    setCityId(rowData.cityid)
    setEmailId(rowData.emailid)
    setContactNumber(rowData.contactnumber)
    setContactPerson(rowData.contactperson)
    setOpen(true)
  }
  const handleCloseDialog = (rowData) => {
    setOpen(false)
  }

  const handleDelete = async (bid) => {
    Swal.fire({
      title: "Do you want to Delete the selected category ",

      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        var response = await postData('category/delete_branch', { branchid: bid })
        Swal.fire("Saved!", "", "success");
        fetchAllBranch()
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  const displayBranch = () => {


    return (<div>

      <MaterialTable
        title='List of Food Branch'
        columns={[
          { title: 'Branch Id', field: 'branchid' },
          { title: 'Branch Name', field: 'branchname' },
          { title: 'Address', field: 'address' },
          { title: 'Latlong', field: 'latlong' },
          { title: 'State', field: 'statename' },
          { title: 'City', field: 'cityname' },
          { title: 'Email Id', field: 'emailid' },
          { title: 'Contact Number', field: 'contactnumber' },
          { title: 'Contact Person', field: 'contactperson' }
        ]}

        data={branchList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => handleOpenDialog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData) => handleDelete(rowData.branchid)
          }
        ]}
      />

    </div>)
  }


  return (<div className={classes.root}>
    <div className={classes.box}>
      {displayBranch()}
    </div>
    {showDialog()}
  </div>)
}