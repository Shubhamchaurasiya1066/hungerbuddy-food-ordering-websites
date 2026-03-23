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
export default function DisplayEmployee() {
    var classes = useStyles()
    var navigate=useNavigate()
    const [employeeList, setEmployeeList] = useState([])
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
    const [employeeId, setEmployeeId] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [otherNo, setOtherNo] = useState('')
    const [department, setDepartment] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [currentState, setCurrentState] = useState('')
    const [currentCity, setCurrentCity] = useState('')
    const [currentPincode, setCurrentPincode] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [permanentState, setPermanentState] = useState('')
    const [currentCityList, setCurrentCityList] = useState([])
    const [permanentCityList, setPermanentCityList] = useState([])
    const [stateList, setStateList] = useState([])
    const [permanentCity, setPermanentCity] = useState('')
    const [permanentPincode, setPermanentPincode] = useState('')
    const [employeePicture, setEmployeePicture] = useState({ bytes: '', fileName: student })

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false

        if (employeeName.length == 0) {
            setError((prev) => ({ ...prev, 'employeeName': 'Pls Input Employee name' }))
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
        if (otherNo.length == 0) {
            setError((prev) => ({ ...prev, 'otherNo': 'Pls Input Other Number' }))
            isError = true
        }
        if (department.length == 0) {
            setError((prev) => ({ ...prev, 'department': 'Pls Input Department' }))
            isError = true
        }

        if (currentAddress.length == 0) {
            setError((prev) => ({ ...prev, 'currentAddress': 'Pls Input Current Address' }))
            isError = true
        }
        if (currentState.length == 0) {
            setError((prev) => ({ ...prev, 'currentState': 'Pls Input Current State' }))
            isError = true
        }
        if (currentCity.length == 0) {
            setError((prev) => ({ ...prev, 'currentCity': 'Pls Input Current City' }))
            isError = true
        }

        if (currentPincode.length == 0) {
            setError((prev) => ({ ...prev, 'currentPincode': 'Pls Input Current Pincode' }))
            isError = true
        }
        if (permanentAddress.length == 0) {
            setError((prev) => ({ ...prev, 'permanentAddress': 'Pls Input Permanent Address' }))
            isError = true
        }

        if (permanentState.length == 0) {
            setError((prev) => ({ ...prev, 'permanentState': 'Pls Input Permanent State' }))
            isError = true
        }

        if (permanentCity.length == 0) {
            setError((prev) => ({ ...prev, 'permanentCity': 'Pls Input Permanent City' }))
            isError = true
        }
        if (permanentPincode.length == 0) {
            setError((prev) => ({ ...prev, 'permanentPincode': 'Pls Input Permanent Pincode' }))
            isError = true
        }

        // if (employeePicture.bytes.length == 0) {
        //     setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
        //     isError = true
        // }

        return isError
    }

    const handleChange = (e) => {
        setEmployeePicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

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




    const handleCurrentStateChange = (e) => {
        setCurrentState(e.target.value)
        fetchAllCities(e.target.value, 'current')
    }

    const handlePermanentStateChange = (e) => {
        setPermanentState(e.target.value)
        fetchAllCities(e.target.value, 'permanent')
    }


    const fetchAllStates = async () => {
        var res = await getData('statecity/fetch_states')
        setStateList(res.data)

    }

    const fetchAllCities = async (sid, type) => {
        var res = await postData('statecity/fetch_cities', { stateid: sid })
        if (type === 'current') setCurrentCityList(res.data)
        else setPermanentCityList(res.data)
    }

    useEffect(function () {
        fetchAllStates()
    }, [])
    const fillStates = () => {
        return stateList?.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        })
    }

    const fillCurrentCities = () => {
        return currentCityList?.map((item) => (
            <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        ))
    }

    const fillPermanentCities = () => {
        return permanentCityList?.map((item) => (
            <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        ))
    }



    const handleClick = async () => {
        var err = validation()
        if (err == false) {

            var body = {
                "employeeid": employeeId,
                "branchid": branchId,                
                "employeename": employeeName,
                "dob": dob,
                "gender": gender,               
                "emailid": emailId,
                "mobileno": mobileNo,
                "otherno":otherNo,
                "department":department,
                "current_address": currentAddress,
                "current_stateid": currentState,
                "current_cityid": currentCity,
                "current_pincode": currentPincode,
                "permanent_address": permanentAddress,
                "permanent_stateid": permanentState,
                "permanent_cityid": permanentCity,
                "permanent_pincode": permanentPincode,
                "createddate": getDate(),
                "createdtime": getTime(),
                "userid": 'xxxx'
            }

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('employee/edit_employee', body)

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
                fetchAllEmployee()

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
                fetchAllEmployee()
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
                    <img src={employeePicture.fileName} style={{ width: 100, borderRadius: 5 }} />
                </Grid>
                <Grid size={6} style={{ display: 'flex', alignItems: 'center' }}>
                    {statusButton ? saveCancelbutton() : <></>}
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth endIcon={<CloudUploadIcon />} component='label' variant='contained' style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            employee picture
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    }


    const showEmployee = () => {
        return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Employee</div>
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
                        <TextField fullWidth label='Employee Name'
                            onChange={(e) => setEmployeeName(e.target.value)}
                            size="small"
                            value={employeeName}
                            helperText={error?.employeeName}
                            error={error?.employeeName}
                            onFocus={() => handleError('employeeName', '')}
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
                        <TextField fullWidth label='Other Number'
                            onChange={(e) => setOtherNo(e.target.value)}
                            size="small"
                            value={otherNo}
                            helperText={error?.otherNo}
                            error={error?.otherNo}
                            onFocus={() => handleError('otherNo', '')}
                        />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Department</InputLabel>
                            <Select label='Department' value={department} onChange={(e) => setDepartment(e.target.value)}
                                helperText={error?.department}
                                error={error?.department}
                                onFocus={() => handleError('department', '')}>
                                <MenuItem>-Select-</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Faculties">Faculties</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>

                
                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Current Address'
                            onChange={(e) => setCurrentAddress(e.target.value)}
                            size="small"
                            value={currentAddress}
                            helperText={error?.currentAddress}
                            error={error?.currentAddress}
                            onFocus={() => handleError('currentAddress', '')}
                        />
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Current State</InputLabel>
                            <Select label="Current State" value={currentState} onChange={handleCurrentStateChange} >
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
                            <InputLabel>Current City</InputLabel>
                            <Select label="Current City" value={currentCity} onChange={(e) => setCurrentCity(e.target.value)}>
                                <MenuItem>-Select City-</MenuItem>
                                {fillCurrentCities()}
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
                        <TextField fullWidth label='Current Pincode'
                            onChange={(e) => setCurrentPincode(e.target.value)}
                            size="small"
                            value={currentPincode}
                            helperText={error?.currentPincode}
                            error={error?.currentPincode}
                            onFocus={() => handleError('currentPincode', '')}
                        />
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Permanent Address'
                            onChange={(e) => setPermanentAddress(e.target.value)}
                            size="small"
                            value={permanentAddress}
                            helperText={error?.permanentAddress}
                            error={error?.permanentAddress}
                            onFocus={() => handleError('permanentAddress', '')}
                        />
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Permanent State</InputLabel>
                            <Select label="Permanent State" value={permanentState} onChange={handlePermanentStateChange} >
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
                            <InputLabel>Permanent City</InputLabel>
                            <Select label="Permanent City" value={permanentCity} onChange={(e) => setPermanentCity(e.target.value)}>
                                <MenuItem>-Select City-</MenuItem>
                                {fillPermanentCities()}
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
                        <TextField fullWidth label='Permanent Pincode'
                            onChange={(e) => setPermanentPincode(e.target.value)}
                            size="small"
                            value={permanentPincode}
                            helperText={error?.permanentPincode}
                            error={error?.permanentPincode}
                            onFocus={() => handleError('permanentPincode', '')}
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
    const fetchAllEmployee = async () => {
        var response = await getData('employee/fetch_all_employee')
        setEmployeeList(response.data)
    }
    useEffect(function () {
        fetchAllEmployee()
    }, [])

    const handleCancel = () => {
        setEmployeePicture({ fileName: tempImage, bytes: '' })
        setStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData()
        formData.append('employeeid', employeeId)
        formData.append('employee_picture', employeePicture.bytes)
        formData.append("createddate", getDate());
        formData.append("createdtime", getTime());
        formData.append("userid", 'xxxx');

        //    var body={categoryid:categoryIcon,categoryname:categoryName}
        var response = await postData('employee/edit_employeepicture', formData)

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
            fetchAllEmployee()
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
            fetchAllEmployee()
        }
    }

    const saveCancelbutton = () => {
        return <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
            <Button onClick={handleEditPicture} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Save</Button>
            <Button onClick={handleCancel} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Cancel</Button>
        </div>
    }

    const handleDelete = async (eid) => {

        Swal.fire({
            title: "Do you want to Delete the selected employee ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('employee/delete_employee', { employeeid: eid })
                Swal.fire(response.message);
                fetchAllEmployee()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleOpenDialog = (rowData, status) => {
        setdiologState(status)
        fetchAllCities(rowData.current_stateid, 'current')
        fetchAllCities(rowData.permanent_stateid, 'permanent')
        setEmployeeId(rowData.employeeid)
        setBranchId(rowData.branchid)
        setEmployeeName(rowData.employeename)
        setDob(rowData.dob)
        setGender(rowData.gender)
        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setOtherNo(rowData.otherno)
        setDepartment(rowData.department)
        setCurrentAddress(rowData.current_address)
        setCurrentState(rowData.current_stateid)
        setCurrentCity(rowData.current_cityid)
        setCurrentPincode(rowData.current_pincode)
        setPermanentAddress(rowData.permanent_address)
        setPermanentState(rowData.permanent_stateid)
        setPermanentCity(rowData.permanent_cityid)
        setPermanentPincode(rowData.permanent_pincode)
        setEmployeePicture({ fileName: `${serverURL}/images/${rowData.employee_picture}`, bytes: '' })
        setTempImage(`${serverURL}/images/${rowData.employee_picture}`)
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
                    {diologState == 'Data' ? showEmployee() : showPictureInterface()}
                </DialogContent>
            </Dialog>

        </div>)
    }

    const displayemployee = () => {
        return (<div>
            <MaterialTable
                title={`List of Food students,${branch?.branchname}`}
                columns={[
                    { title: 'Branch Name', field: 'branchname' },                
                    { title: 'Employee Name', field: 'employeename' },
                    { title: 'DOB', field: 'dob' },
                    { title: 'Gender', field: 'gender' },                   
                    { title: 'Email Id', field: 'emailid' },
                    { title: 'Mobile Number', field: 'mobileno' },
                    { title: 'Other Number', field: 'otherno' },
                    { title: 'Department', field: 'department' },
                    { title: 'Current Address', field: 'current_address' },
                    { title: 'Current State ', field: 'currentstatename' },
                    { title: 'Current City', field: 'currentcityname' },
                    { title: 'Current Pincode', field: 'current_pincode' },
                    { title: 'Permanent Address', field: 'permanent_address' },
                    { title: 'Permanent State', field: 'permanentstatename' },
                    { title: 'Permanent City', field: 'permanentcityname' },
                    { title: 'Permanent Pincode', field: 'permanent_pincode' },

                    {
                        title: 'Picture', render: (rowData) => <div onClick={() => handleOpenDialog(rowData, "Picture")}> <EditIconComponent image={rowData.employee_picture} /></div>
                    }]}
                data={employeeList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.employeeid)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Employees',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/employee')
                    }

                ]}
            />
        </div>)
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayemployee()}
        </div>
        {showDialog()}
    </div>)
}