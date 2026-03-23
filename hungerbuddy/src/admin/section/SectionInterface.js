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
export default function SectionInterface({refresh,setRefresh}) {
    var classes = useStyles()
    var branch = JSON.parse(localStorage.getItem('Branch'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const [sectionId, setSectionId] = useState('')
    const [batchId, setBatchId] = useState('')
    const [sectionName, setSectionName] = useState('')
    const [branchList, setBranchList] = useState([])
    const [batchList, setBatchList] = useState([])
    const [error, setError] = useState({ fileError: null })

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false

        if (sectionName.length == 0) {
            setError((prev) => ({ ...prev, 'sectionName': 'Pls Input Section name' }))
            isError = true
        }

        return isError
    }

    const handleBranchChange = (e) => {
        setBranchId(e.target.value)
        fetchAllBatch(e.target.value)
    }

    const fetchAllBranch = async () => {
        var res = await getData('branchbatch/fetch_branch')
        setBranchList(res.data)

    }

    const fetchAllBatch = async (bid) => {
        var res = await postData('branchbatch/fetch_batch',{ branchid: bid })
        setBatchList(res.data)
    }
    useEffect(function () {
        fetchAllBranch()
    }, [])

    useEffect(() => {
  if (branchId) fetchAllBatch(branchId);
}, [branchId]);


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


    const handleClick = async () => {
        var err = validation()
        if (err == false) {
            var body = { branchid: branchId, batchid: batchId, sectionname: sectionName,createddate: getDate(), createdtime: getTime(), userid: 'xxxx' }

            var response = await postData('section/submit_section', body)

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
                            <div className={classes.titleStyle}>Section</div>
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
                            <Select label="Batch" value={batchId} onChange={(e) => setBatchId(e.target.value)}>
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
                        <TextField
                            fullWidth
                            label='Section Name'
                            size="small"
                            onChange={(e) => setSectionName(e.target.value)}
                            error={error?.sectionName}
                            helperText={error?.sectionName}
                            onFocus={()=>handleError('sectionName','')}
                        />
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