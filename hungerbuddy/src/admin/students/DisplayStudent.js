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
export default function DisplayStudent() {
    var classes = useStyles()
    var navigate=useNavigate()
    const [studentList, setStudentList] = useState([])
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ fileError: null })
    const [diologState, setdiologState] = useState('')
    const [statusButton, setStatusButton] = useState(false)
    const [tempImage, setTempImage] = useState('')
    /***********Student View*************/
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

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false

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

        // if (studentPicture.bytes.length == 0) {
        //     setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
        //     isError = true
        // }

        return isError
    }

    const handleChange = (e) => {
        setStudentPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

        setError((prev) => ({ ...prev, 'fileError': null }))
        setStatusButton(true)
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

            var body = {
                "enrollmentno": enrollmentNo,
                "branchid": branchId,
                "batchid": batchId,
                "sectionid": sectionId,
                "studentname": studentName,
                "dob": dob,
                "gender": gender,
                "fathername": fatherName,
                "mothername": motherName,
                "emailid": emailId,
                "mobileno": mobileNo,
                "fathercontactno": fatherContactNo,
                "mothercontactno": motherContactNo,
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
            var response = await postData('student/edit_student', body)

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
                fetchAllStudent()

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
                fetchAllStudent()
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
                            <IconButton onClick={handleCloseDialog} aria-label="delete" style={{ display: 'flex', marginLeft: 'auto', color: '#251010ff' }}>
                                <ClearIcon style={{ color: '#251010ff' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={6}>
                    <img src={studentPicture.fileName} style={{ width: 100, borderRadius: 5 }} />
                </Grid>
                <Grid size={6} style={{ display: 'flex', alignItems: 'center' }}>
                    {statusButton ? saveCancelbutton() : <></>}
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth endIcon={<CloudUploadIcon />} component='label' variant='contained' style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            student picture
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    }


    const showStudent = () => {
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div className={classes.titleBox}>
                                <div className={classes.subTitleStyle}>HungerBuddy</div>
                                <div className={classes.titleStyle}>Edit Student</div>
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
                            <TextField fullWidth label='Student Name'
                                onChange={(e) => setStudentName(e.target.value)}
                                size="small"
                                value={studentName}
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
                            <TextField fullWidth label='Father Name'
                                onChange={(e) => setFatherName(e.target.value)}
                                size="small"
                                value={fatherName}
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
                                value={motherName}
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

                    <Grid size={6}>
                        <div style={{ padding: '0px 5px 0px 5px' }}>
                            <TextField fullWidth label='Father Contact No.'
                                onChange={(e) => setFatherContactNo(e.target.value)}
                                size="small"
                                value={fatherContactNo}
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
                                value={motherContactNo}
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
                    <Grid size={6}>
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

                    <Grid size={6}>
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

                    <Grid size={4}>
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
                    <Grid size={4}>
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

                    <Grid size={4}>
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
    const fetchAllStudent = async () => {
        var response = await getData('student/fetch_all_student')
        setStudentList(response.data)
    }
    useEffect(function () {
        fetchAllStudent()
    }, [])

    const handleCancel = () => {
        setStudentPicture({ fileName: tempImage, bytes: '' })
        setStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData()
        formData.append('enrollmentno', enrollmentNo)
        formData.append('student_picture', studentPicture.bytes)
        formData.append("createddate", getDate());
        formData.append("createdtime", getTime());
        formData.append("userid", 'xxxx');

        //    var body={categoryid:categoryIcon,categoryname:categoryName}
        var response = await postData('student/edit_studentpicture', formData)

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
            fetchAllStudent()
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
            fetchAllStudent()
        }
    }

    const saveCancelbutton = () => {
        return <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
            <Button onClick={handleEditPicture} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Save</Button>
            <Button onClick={handleCancel} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Cancel</Button>
        </div>
    }

    const handleDelete = async (sid) => {

        Swal.fire({
            title: "Do you want to Delete the selected student ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('student/delete_student', { enrollmentno: sid })
                Swal.fire(response.message);
                fetchAllStudent()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleOpenDialog = (rowData, status) => {
        setdiologState(status)
        fetchAllCities(rowData.current_stateid, 'current')
        fetchAllCities(rowData.permanent_stateid, 'permanent')
        setEnrollmentNo(rowData.enrollmentno)
        setBranchId(rowData.branchid)
        setBatchId(rowData.batchid)
        setSectionId(rowData.sectionid)
        setStudentName(rowData.studentname)
        setDob(rowData.dob)
        setGender(rowData.gender)
        setFatherName(rowData.fathername)
        setMotherName(rowData.mothername)
        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setFatherContactNo(rowData.fathercontactno)
        setmotherContactNo(rowData.mothercontactno)
        setCurrentAddress(rowData.current_address)
        setCurrentState(rowData.current_stateid)
        setCurrentCity(rowData.current_cityid)
        setCurrentPincode(rowData.current_pincode)
        setPermanentAddress(rowData.permanent_address)
        setPermanentState(rowData.permanent_stateid)
        setPermanentCity(rowData.permanent_cityid)
        setPermanentPincode(rowData.permanent_pincode)
        setStudentPicture({ fileName: `${serverURL}/images/${rowData.student_picture}`, bytes: '' })
        setTempImage(`${serverURL}/images/${rowData.student_picture}`)
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
                    {diologState == 'Data' ? showStudent() : showPictureInterface()}
                </DialogContent>
            </Dialog>

        </div>)
    }

    const displaystudent = () => {
        return (<div>
            <MaterialTable
                title={`List of Food students,${branch?.branchname}`}
                columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Section Name', field: 'sectionname' },
                    { title: 'Student Name', field: 'studentname' },
                    { title: 'DOB', field: 'dob' },
                    { title: 'Gender', field: 'gender' },
                    { title: 'Father Name', field: 'fathername' },
                    { title: 'Mother Name', field: 'mothername' },
                    { title: 'Email Id', field: 'emailid' },
                    { title: 'Mobile Number', field: 'mobileno' },
                    { title: 'Father Number', field: 'fathercontactno' },
                    { title: 'Mother Number', field: 'mothercontactno' },
                    { title: 'Current Address', field: 'current_address' },
                    { title: 'Current State ', field: 'currentstatename' },
                    { title: 'Current City', field: 'currentcityname' },
                    { title: 'Current Pincode', field: 'current_pincode' },
                    { title: 'Permanent Address', field: 'permanent_address' },
                    { title: 'Permanent State', field: 'permanentstatename' },
                    { title: 'Permanent City', field: 'permanentcityname' },
                    { title: 'Permanent Pincode', field: 'permanent_pincode' },

                    {
                        title: 'Picture', render: (rowData) => <div onClick={() => handleOpenDialog(rowData, "Picture")}> <EditIconComponent image={rowData.student_picture} /></div>
                    }]}
                data={studentList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.enrollmentno)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add students',
                        isFreeAction: true,
                        onClick: (event) => navigate('/admindashboard/student')
                    }

                ]}
            />
        </div>)
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displaystudent()}
        </div>
        {showDialog()}
    </div>)
}