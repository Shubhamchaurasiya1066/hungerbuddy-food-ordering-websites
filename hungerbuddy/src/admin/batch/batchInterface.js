import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react";
import Swal from "sweetalert2";
import { postData, serverURL, getDate, getTime, getData } from "../../services/FetchNodeServices";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        //height: '100%'
    },
    box: {
        width: '60%',
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
export default function BatchInterface({refresh,setRefresh}) {
    var classes = useStyles()
    var branch = JSON.parse(localStorage.getItem('Branch'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const [batchId, setBatchId] = useState('')
    const [batchName, setBatchName] = useState('')
    const [session, setSession] = useState('')
    
    const [error, setError] = useState({ fileError: null })

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false

        if (batchName.length == 0) {
            setError((prev) => ({ ...prev, 'batchName': 'Pls Input Batch name' }))
            isError = true
        }
        if (session.length == 0) {
            setError((prev) => ({ ...prev, 'session': 'Pls Input Session' }))
            isError = true
        }
        
        return isError
    }

   
    const handleClick = async () => {
        var err = validation()
        if (err == false) {
           var body={branchid:branchId,batchname:batchName,session:session,createddate: getDate(), createdtime: getTime(), userid: 'xxxx'}

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('batch/submit_batch', body)

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
        setRefresh(!refresh)

    };


    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Batch</div>
                        </div>
                    </div>

                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Branch name'
                            onChange={(e) => setBranchId(e.target.value)}
                            value={branchName}
                            size="small"
                        />
                    </div>
                </Grid>
                
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Batch Name'
                            onChange={(e) => setBatchName(e.target.value)}
                            size="small"
                            helperText={error?.batchName}
                            error={error?.batchName}
                            onFocus={() => handleError('batchName', '')}
                        />
                    </div>
                </Grid>
                
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Session</InputLabel>
                            <Select label='Session' onChange={(e) => setSession(e.target.value)}
                                helperText={error?.session}
                                error={error?.session}
                                onFocus={() => handleError('session', '')}>
                                <MenuItem>-Select-</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2025">2025</MenuItem>
                                <MenuItem value="2026">2026</MenuItem>
                                <MenuItem value="2027">2027</MenuItem>
                                <MenuItem value="2028">2028</MenuItem>
                                <MenuItem value="2029">2029</MenuItem>
                                <MenuItem value="2030">2030</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <Button variant="contained" size="medium" fullWidth style={{ background: "hsla(321, 32%, 37%, 1.00)" }} onClick={handleClick}>
                            Save
                        </Button>
                    </div>
                </Grid>
                <Grid size={3}>
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