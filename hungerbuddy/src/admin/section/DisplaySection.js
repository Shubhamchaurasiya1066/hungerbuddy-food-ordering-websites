import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import { Navigate, useNavigate } from "react-router-dom";
import { IconButton, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material"
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getData, serverURL, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { render } from "@testing-library/react";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    box: {
        width: '60%',
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
export default function DisplaySection({refresh,setRefresh}) {
    var classes = useStyles()
    var navigate = useNavigate()
    const [sectionList, setSectionList] = useState([])
    const [open, setOpen] = useState(false)
    /***********section View*************/
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
                var body = {sectionid:sectionId, branchid:branchId, batchid: batchId, sectionname: sectionName,createddate: getDate(), createdtime: getTime(), userid: 'xxxx' }
    
                var response = await postData('section/edit_section', body)
    
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
                   fetchAllSection()
    
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
                    fetchAllSection()
                }
    
            }
    
        };
    


    const showSection = () => {
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
                            <Select label="Batch" value={branchId} onChange={handleBranchChange} >
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
                            value={sectionName}
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


    /*************************/
    const fetchAllSection = async () => {
        var response = await getData('section/fetch_all_section')
        setSectionList(response.data)
    }
    useEffect(function () {
        fetchAllSection()
    }, [refresh])

    
    const handleDelete = async (sid) => {

        Swal.fire({
            title: "Do you want to Delete the selected section ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('section/delete_section', { sectionid: sid })
                Swal.fire(response.message);
                fetchAllSection()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleOpenDialog = (rowData) => {
        fetchAllBatch(rowData.branchid)
        setSectionId(rowData.sectionid)
        setBranchId(rowData.branchid)
        setBatchId(rowData.batchid)
        setSectionName(rowData.sectionname)
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
                    {showSection()}
                </DialogContent>
            </Dialog>

        </div>)
    }

    const displaysection = () => {
        return (<div>
            <MaterialTable
                title={`List of Section,${branch?.branchname}`}
                columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Section Name', field: 'sectionname' },
                ]}
                data={sectionList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.sectionid)
                    },
                    
                ]}
            />
        </div>)
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displaysection()}
        </div>
        {showDialog()}
    </div>)
}