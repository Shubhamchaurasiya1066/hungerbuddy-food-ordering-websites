import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react";
import Swal from "sweetalert2";
import { postData, serverURL, getData,getDate,getTime } from "../../services/FetchNodeServices";
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
export default function StudentInterface() {
    var classes = useStyles()
    var branch = JSON.parse(localStorage.getItem('Branch'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const [batchId, setBatchId] = useState('')
    const [sectionId, setSectionId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [batchList, setBatchList] = useState([])
    const [sectionList, setSectionList] = useState([])
    const [studentName, setStudentName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [fatherContactNo, setFatherContactNo] = useState('')
    const [motherContactNo, setmotherContactNo] = useState('')
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
    const [studentPicture, setStudentPicture] = useState({ bytes: '', fileName: student })
    const [error, setError] = useState({ fileError: null })

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false
        
        if (enrollmentNo.length == 0) {
            setError((prev) => ({ ...prev, 'enrollmentNo': 'Pls Input Student name' }))
            isError = true
        }

        if (studentName.length == 0) {
            setError((prev) => ({ ...prev, 'studentName': 'Pls Input Student name' }))
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
        if (fatherName.length == 0) {
            setError((prev) => ({ ...prev, 'fatherName': 'Pls Input Father Name' }))
            isError = true
        }
        if (motherName.length == 0) {
            setError((prev) => ({ ...prev, 'motherName': 'Pls Input Mother Name' }))
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
        if (fatherContactNo.length == 0) {
            setError((prev) => ({ ...prev, 'fatherContactNo': 'Pls Input Father Contact No.' }))
            isError = true
        }
        if (motherContactNo.length == 0) {
            setError((prev) => ({ ...prev, 'motherContactNo': 'Pls Input Mother Contact No.' }))
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

        if (studentPicture.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
            isError = true
        }

        return isError
    }

    const handleChange = (e) => {
        setStudentPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

        setError((prev) => ({ ...prev, 'fileError': null }))
    }

    const handleBranchChange = (e) => {
        setBranchId(e.target.value)
        fetchAllBatch(e.target.value)
    }
    const handleBatchChange = (e) => {
        setBatchId(e.target.value)
        fetchAllSection(e.target.value)
    }

    const fetchAllBranch = async () => {
        var res = await getData('branchbatch/fetch_branch')
        setBranchList(res.data)

    }

    const fetchAllBatch = async (bid) => {
        var res = await postData('branchbatch/fetch_batch', { branchid: bid })
        setBatchList(res.data)
    }
    const fetchAllSection = async (batchid) => {
        var res = await postData('branchbatch/fetch_section', { batchid: batchid })
        setSectionList(res.data)
    }
    useEffect(function () {
        fetchAllBranch()
    }, [])

    useEffect(() => {
        if (branchId) fetchAllBatch(branchId);
    }, [branchId]);

    useEffect(() => {
        if (batchId) fetchAllSection(batchId);
    }, [batchId]);


    const fillBranch = () => {
        return branchList?.map((item) => {
            return (<MenuItem value={item.branchid}>{item.branchname}</MenuItem>)
        })
    }

    const fillBatch = () => {
        return batchList?.map((item) => {
            return (<MenuItem value={item.batchid}>{item.batchname}</MenuItem>)
        })
    }

    const fillSection = () => {
        return sectionList?.map((item) => {
            return (<MenuItem value={item.sectionid}>{item.sectionname}</MenuItem>)
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
            formData.append("batchid", batchId);
            formData.append("sectionid", sectionId);
            formData.append("enrollmentno", enrollmentNo);
            formData.append("studentname", studentName);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("fathername", fatherName);
            formData.append("mothername", motherName)
            formData.append("emailid", emailId)
            formData.append("mobileno", mobileNo)
            formData.append("fathercontactno", fatherContactNo)
            formData.append("mothercontactno", motherContactNo)
            formData.append("current_address", currentAddress)
            formData.append("current_stateid", currentState)
            formData.append("current_cityid", currentCity)
            formData.append("current_pincode", currentPincode)
            formData.append("permanent_address", permanentAddress)
            formData.append("permanent_stateid", permanentState)
            formData.append("permanent_cityid", permanentCity)
            formData.append("permanent_pincode", permanentPincode)
            formData.append("student_picture", studentPicture.bytes)
            formData.append("createddate", getDate());
            formData.append("createdtime", getTime());
            formData.append("userid", 'xxxx');

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('student/submit_student', formData)

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
        var body={enrollmentno:enrollmentNo,points:0}
        var response2=await postData('wallet/submit_studentwallet',body)

    };


    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Student</div>
                        </div>
                    </div>

                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Branch</InputLabel>
                            <Select label="Branch" value={branchId} onChange={handleBranchChange} >
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
                        <FormControl size="small" fullWidth>
                            <InputLabel>Batch</InputLabel>
                            <Select label="Batch" value={batchId} onChange={handleBatchChange}>
                                <MenuItem>-Select Batch-</MenuItem>
                                {fillBatch()}
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

                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Section</InputLabel>
                            <Select label="Section" value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
                                <MenuItem>-Select Section-</MenuItem>
                                {fillSection()}
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

                        <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Enrollment Number'
                            onChange={(e) => setEnrollmentNo(e.target.value)}
                            size="small"
                            helperText={error?.enrollmentNo}
                            error={error?.enrollmentNo}
                            onFocus={() => handleError('enrollmentNo', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Student Name'
                            onChange={(e) => setStudentName(e.target.value)}
                            size="small"
                            helperText={error?.studentName}
                            error={error?.studentName}
                            onFocus={() => handleError('studentName', '')}
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
                        <TextField fullWidth label='Father Name'
                            onChange={(e) => setFatherName(e.target.value)}
                            size="small"
                            helperText={error?.fatherName}
                            error={error?.fatherName}
                            onFocus={() => handleError('fatherName', '')}
                        />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Mother Name'
                            onChange={(e) => setMotherName(e.target.value)}
                            size="small"
                            helperText={error?.motherName}
                            error={error?.motherName}
                            onFocus={() => handleError('motherName', '')}
                        />
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

                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Father Contact No.'
                            onChange={(e) => setFatherContactNo(e.target.value)}
                            size="small"
                            helperText={error?.fatherContactNo}
                            error={error?.fatherContactNo}
                            onFocus={() => handleError('fatherContactNo', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Mother Contact No.'
                            onChange={(e) => setmotherContactNo(e.target.value)}
                            size="small"
                            helperText={error?.motherContactNo}
                            error={error?.motherContactNo}
                            onFocus={() => handleError('motherContactNo', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>
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
                <Grid size={6}>
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
                            Student Picture
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <img src={studentPicture.fileName} style={{ width: 30 }} />
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