import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import student from "../../assets/student.webp"
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import EditIconComponent from '../../components/EditIconComponents';
import { Navigate, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getData, serverURL, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { render } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    box: {
        width: '75%',
        height: 'auto',
        padding: 10
    },
    heading: {
        width: '100%',
        height: 'auto',
        background: "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(0, 100%, 89%, 1) 100%)",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        display: 'flex',
        flexDirection: 'row'
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
        display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '30%', padding: 10
    }
}))
export default function DisplayDelivery() {
    var classes = useStyles()
    var navigate=useNavigate()
    const [deliveryList, setDeliveryList] = useState([])
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ fileError: null })
    const [diologState, setdiologState] = useState('')
    const [statusButton, setStatusButton] = useState(false)
    const [tempImage, setTempImage] = useState('')
    /***********Employee View*************/
    var branch = JSON.parse(localStorage.getItem('Branch'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const [branchList, setBranchList] = useState([])
    const [deliveryId, setDeliveryId] = useState('')
    const [deliveryName, setDeliveryName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [department, setDepartment] = useState('')
    const [Address, setAddress] = useState('')
    const [stateId, setStateId] = useState('')
    const [cityId, setCityId] = useState('')    
    const [cityList, setCityList] = useState([])
    const [stateList, setStateList] = useState([])
    const[aadharNo,setAadharNo]=useState('')
    const[status,setStatus]=useState('')
    const[vehicleNo,setVehicleNo]=useState('')
    const [deliveryBoyPicture, setDeliveryBoyPicture] = useState({ bytes: '', fileName: student })


    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false

        if (deliveryName.length == 0) {
            setError((prev) => ({ ...prev, 'deliveryName': 'Pls Input Delivery Boy name' }))
            isError = true
        }
        if (dob.length == 0) {
            setError((prev) => ({ ...prev, 'dob': 'Pls Input date of birth' }))
            isError = true
        }
        if (gender.length == 0) {
            setError((prev) => ({ ...prev, 'gender': 'Pls Input Gender' }))
            isError = true
        }

        if (emailId.length == 0) {
            setError((prev) => ({ ...prev, 'emailId': 'Pls Input EmailId' }))
            isError = true
        }
        if (mobileNo.length == 0) {
            setError((prev) => ({ ...prev, 'mobileNo': 'Pls Input Mobile Number' }))
            isError = true
        }
       
       

        if (Address.length == 0) {
            setError((prev) => ({ ...prev, 'Address': 'Pls Input Address' }))
            isError = true
        }
        if (stateId.length == 0) {
            setError((prev) => ({ ...prev, 'State': 'Pls Input State' }))
            isError = true
        }
        if (cityId.length == 0) {
            setError((prev) => ({ ...prev, 'City': 'Pls Input City' }))
            isError = true
        }

        if (aadharNo.length == 0) {
            setError((prev) => ({ ...prev, 'aadharno': 'Pls Input aadhar no.' }))
            isError = true
        }
        if (status.length == 0) {
            setError((prev) => ({ ...prev, 'status': 'Pls Input Status' }))
            isError = true
        }
        if (vehicleNo.length == 0) {
            setError((prev) => ({ ...prev, 'vehicleNo': 'Pls Input Vehicle No' }))
            isError = true
        }


       
        return isError
    }

    const handleChange = (e) => {
        setDeliveryBoyPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

        setError((prev) => ({ ...prev, 'fileError': null }))

        setStatusButton(true)
    }




    const fetchAllBranch = async () => {
        var res = await getData('branchbatch/fetch_branch')
        setBranchList(res.data)

    }


    useEffect(function () {
        fetchAllBranch()
    }, [])



    const fillBranch = () => {
        return branchList?.map((item) => {
            return (<MenuItem value={item.branchid}>{item.branchname}</MenuItem>)
        })
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


    const handleClick = async () => {
        var err = validation()
        if (err == false) {

           
        var  body={ 
            delivery_id:deliveryId,
            branchid:branchId,
            deliveryname: deliveryName,
            dob: dob,
            gender: gender,
            emailid: emailId,
            mobileno: mobileNo,
            address:Address,
            stateid: stateId,
            cityid: cityId,
            aadharno: aadharNo,
            status: status,
            vehicleno: vehicleNo,           
            createddate: getDate(),
            createdtime: getTime(),
            userid: 'xxxx'

            }

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('delivery/edit_delivery', body)

            if (response.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true
                });
                setOpen(false)
                fetchAllDelivery()

            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true
                });
                 setOpen(false)
                fetchAllDelivery()
            }

        }

    };


    const showPictureInterface = () => {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Edit Picture</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton onClick={handleCloseDialog}  style={{ display: 'flex', marginLeft: 'auto', color: '#251010ff' }}>
                                <ClearIcon style={{ color: '#251010ff' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={6}>
                    <img src={deliveryBoyPicture.fileName} style={{ width: 100, borderRadius: 5 }} />
                </Grid>
                <Grid size={6} style={{ display: 'flex', alignItems: 'center' }}>
                    {statusButton ? saveCancelbutton() : <></>}
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth endIcon={<CloudUploadIcon />} component='label' variant='contained' style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            Delivery Boy picture
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    }


    const showDelivery = () => {
        return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Delivery Boy</div>
                        </div>
                    </div>

                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Branch</InputLabel>
                            <Select label="Branch" value={branchId} onChange={(e) => setBranchId(e.target.value)} >
                                <MenuItem>-Select Branch-</MenuItem>
                                {fillBranch()}
                            </Select>
                        </FormControl>
                        {/* <TextField onChange={(e) => setState(e.target.value)} fullWidth label='State'
                helperText={error.state}
                error={error.state}
                onFocus={() => handleError('state', '')}
              /> */}
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Delivery Boy Name'
                            onChange={(e) => setDeliveryName(e.target.value)}
                            size="small"
                            value={deliveryName}
                            helperText={error?.deliveryName}
                            error={error?.deliveryName}
                            onFocus={() => handleError('deliveryName', '')}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth type="date"
                            onChange={(e) => setDob(e.target.value)}
                            size="small"
                            value={dob}
                            helperText={error?.dob}
                            error={error?.dob}
                            onFocus={() => handleError('dob', '')}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                error={error?.gender}
                                helperText={error?.gender}
                                onFocus={() => handleError('gender', '')}
                            >
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Email Id'
                            onChange={(e) => setEmailId(e.target.value)}
                            size="small"
                            value={emailId}
                            helperText={error?.emailId}
                            error={error?.emailId}
                            onFocus={() => handleError('emailId', '')}
                        />
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Mobile Number'
                            onChange={(e) => setMobileNo(e.target.value)}
                            size="small"
                            value={mobileNo}
                            helperText={error?.mobileNo}
                            error={error?.mobileNo}
                            onFocus={() => handleError('mobileNo', '')}
                        />
                    </div>
                </Grid>

                

                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label=' Address'
                            onChange={(e) => setAddress(e.target.value)}
                            size="small"
                            value={Address}
                            helperText={error?.Address}
                            error={error?.Address}
                            onFocus={() => handleError('Address', '')}
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
                            <Select label="City" value={cityId} onChange={(e) => setCityId(e.target.value)}>
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
                        <TextField fullWidth label='Aadhar No.'
                            onChange={(e) => setAadharNo(e.target.value)}
                            size="small"
                            value={aadharNo}
                            helperText={error?.aadharNo}
                            error={error?.aadharNo}
                            onFocus={() => handleError('aadharNo', '')}
                        />
                    </div>
                </Grid>

                <Grid size={2}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Status'
                            onChange={(e) => setStatus(e.target.value)}
                            size="small"
                            value={status}
                            helperText={error?.status}
                            error={error?.status}
                            onFocus={() => handleError('status', '')}
                        />
                    </div>
                </Grid>
                 
                  <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Vehicle No.'
                            onChange={(e) => setVehicleNo(e.target.value)}
                            size="small"
                            value={vehicleNo}
                            helperText={error?.vehicleNo}
                            error={error?.vehicleNo}
                            onFocus={() => handleError('vehicleNo', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <Button variant="contained" size="medium" fullWidth style={{ background: "hsla(321, 32%, 37%, 1.00)" }} onClick={handleClick}>
                            Save
                        </Button>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <Button variant="contained" size="medium" fullWidth style={{ background: "hsla(321, 32%, 37%, 1.00)" }}>
                            Clear
                        </Button>
                    </div>

                </Grid>


            </Grid>

        </div>

    </div>)
    }


    /*************************/
    const fetchAllDelivery = async () => {
        var response = await getData('delivery/fetch_all_deliveryboy')
        setDeliveryList(response.data)
    }
    useEffect(function () {
        fetchAllDelivery()
    }, [])

    const handleCancel = () => {
        setDeliveryBoyPicture({ fileName: tempImage, bytes: '' })
        setStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData()
        formData.append('delivery_id', deliveryId)
        formData.append('picture', deliveryBoyPicture.bytes)
        formData.append("createddate", getDate());
        formData.append("createdtime", getTime());
        formData.append("userid", 'xxxx');

        //    var body={categoryid:categoryIcon,categoryname:categoryName}
        var response = await postData('delivery/edit_deliveryboypicture', formData)

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
            fetchAllDelivery()
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
            fetchAllDelivery()
        }
    }

    const saveCancelbutton = () => {
        return <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
            <Button onClick={handleEditPicture} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Save</Button>
            <Button onClick={handleCancel} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Cancel</Button>
        </div>
    }

    const handleDelete = async (did) => {

        Swal.fire({
            title: "Do you want to Delete the selected Delivery ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('delivery/delete_delivery', { delivery_id: did })
                Swal.fire(response.message);
                fetchAllDelivery()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleOpenDialog = (rowData, status) => {
        setdiologState(status)
        fetchAllCities(rowData.stateid)
        setDeliveryId(rowData.delivery_id)
        setBranchId(rowData.branchid)
        setDeliveryName(rowData.deliveryname)
        setDob(rowData.dob)
        setGender(rowData.gender)
        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setAddress(rowData.address)
        setStateId(rowData.stateid)
        setCityId(rowData.cityid)
        setAadharNo(rowData.aadharno)
        setStatus(rowData.status)
        setVehicleNo(rowData.vehicleno)
        setDeliveryBoyPicture({ fileName: `${serverURL}/images/${rowData.picture}`, bytes: '' })
        setTempImage(`${serverURL}/images/${rowData.picture}`)
        setOpen(true)

    }
    const handleCloseDialog = () => {
        setOpen(false)

    }

    const showDialog = () => {
        return (<div>
            <Dialog open={open}
                onClose={handleCloseDialog}>
                <IconButton onClick={handleCloseDialog} aria-label="delete" style={{ display: 'flex', marginLeft: 'auto' }}>
                    <ClearIcon style={{ color: '#ffff' }} />
                </IconButton>
                <DialogContent>
                    {diologState == 'Data' ? showDelivery() : showPictureInterface()}
                </DialogContent>
            </Dialog>

        </div>)
    }

    const displaydelivery = () => {
        return (<div>
            <MaterialTable
                title={`List of Delivery,${branch?.branchname}`}
                columns={[
                    { title: 'Branch Name', field: 'branchid' },                
                    { title: 'Delivery Name', field: 'deliveryname' },
                    { title: 'DOB', field: 'dob' },
                    { title: 'Gender', field: 'gender' },                   
                    { title: 'Email Id', field: 'emailid' },
                    { title: 'Mobile Number', field: 'mobileno' },
                    { title: 'Address', field: 'address' },
                    { title: 'State', field: 'stateid' },
                    { title: 'City', field: 'cityid' },
                    { title: 'Aadhar No.', field: 'aadharno' },
                    { title: 'Status', field: 'status' },
                    { title: 'Vehicle No.', field: 'vehicleno' },
                   
                    {
                        title: 'Picture', render: (rowData) => <div onClick={() => handleOpenDialog(rowData, "Picture")}> <EditIconComponent image={rowData.picture} /></div>
                    }]}
                data={deliveryList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.delivery_id)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add delivery',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/delivery')
                    }

                ]}
            />
        </div>)
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displaydelivery()}
        </div>
        {showDialog()}
    </div>)
}