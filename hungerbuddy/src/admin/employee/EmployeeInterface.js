import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react";
import Swal from "sweetalert2";
import { postData, serverURL, getData, getDate, getTime } from "../../services/FetchNodeServices";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect } from "react";
import student from "../../assets/student.webp"
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        //height: '100%'
    },
    box: {
        width: '50%',
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
export default function EmployeeInterface() {
    var classes = useStyles()
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
    const [error, setError] = useState({ fileError: null })

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

        if (employeePicture.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
            isError = true
        }

        return isError
    }

    const handleChange = (e) => {
        setEmployeePicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

        setError((prev) => ({ ...prev, 'fileError': null }))
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

            var formData = new FormData();
            formData.append("branchid", branchId)
            formData.append("employeename", employeeName);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("emailid", emailId)
            formData.append("mobileno", mobileNo)
            formData.append("otherno", otherNo)
            formData.append("department", department)
            formData.append("current_address", currentAddress)
            formData.append("current_stateid", currentState)
            formData.append("current_cityid", currentCity)
            formData.append("current_pincode", currentPincode)
            formData.append("permanent_address", permanentAddress)
            formData.append("permanent_stateid", permanentState)
            formData.append("permanent_cityid", permanentCity)
            formData.append("permanent_pincode", permanentPincode)
            formData.append("employee_picture", employeePicture.bytes)
            formData.append("createddate", getDate());
            formData.append("createdtime", getTime());
            formData.append("userid", 'xxxx');

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('employee/submit_employee', formData)

            if (response.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 3000,
                    toast: true
                });


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
            }

        }
        var body = {employeeid:response.employeeid,points: 0 }
        var response1= await postData('wallet/submit_employeewallet', body)

    };


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
                            <Select label='Department' onChange={(e) => setDepartment(e.target.value)}
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
                            helperText={error?.permanentPincode}
                            error={error?.permanentPincode}
                            onFocus={() => handleError('permanentPincode', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>

                        <Button
                            style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                            component='label'
                            variant="contained"
                            fullWidth
                            size="small"
                            endIcon={<CloudUploadIcon style={{ fontSize: 34 }} />}
                        >
                            Employee Picture
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <img src={employeePicture.fileName} style={{ width: 30 }} />
                    </div>
                    <div style={{ color: '#d32f2f', fontFamily: "Roboto,Helvetica,Arial,sans-serif", fontWeight: 400, fontSize: '0.75rem', lineHeight: '1.66rem' }}>{error?.fileError == null ? '' : error.fileError}</div>

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