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
export default function DeliveryBoyInterface() {
    var classes = useStyles()
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
    const [error, setError] = useState({ fileError: null })

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


        if (deliveryBoyPicture.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
            isError = true
        }

        return isError
    }

    const handleChange = (e) => {
        setDeliveryBoyPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

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
        var err = validation()
        if (err == false) {

            var formData = new FormData();
            formData.append("branchid", branchId)
            formData.append("deliveryname", deliveryName);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("emailid", emailId)
            formData.append("mobileno", mobileNo)
            formData.append("address",Address)
            formData.append("stateid", stateId)
            formData.append("cityid", cityId)
            formData.append("aadharno", aadharNo)
            formData.append("status", status)
            formData.append("vehicleno", vehicleNo)           
            formData.append("picture", deliveryBoyPicture.bytes)
            formData.append("password", generatePassword())
            formData.append("createddate", getDate());
            formData.append("createdtime", getTime());
            formData.append("userid", 'xxxx');

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('delivery/submit_deliveryboy', formData)

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
       
    };


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
                        <TextField fullWidth label=' Address'
                            onChange={(e) => setAddress(e.target.value)}
                            size="small"
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
                            helperText={error?.vehicleNo}
                            error={error?.vehicleNo}
                            onFocus={() => handleError('vehicleNo', '')}
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
                            Delivery Boy Picture
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <img src={deliveryBoyPicture.fileName} style={{ width: 30 }} />
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