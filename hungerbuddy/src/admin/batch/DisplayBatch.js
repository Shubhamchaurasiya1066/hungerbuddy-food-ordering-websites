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
export default function DisplayBatch({ refresh, setRefresh }) {
    var classes = useStyles()
    var navigate = useNavigate()
    const [batchList, setBatchList] = useState([])
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ fileError: null })
    const [statusButton, setStatusButton] = useState(false)
    /***********Batch View*************/
    var branch = JSON.parse(localStorage.getItem('Branch'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const [batchId, setBatchId] = useState('')
    const [batchName, setBatchName] = useState('')
    const[session,setSession]=useState('')    
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
               var body={batchid:batchId,branchid:branchId,batchname:batchName,session:session,createddate: getDate(), createdtime: getTime(), userid: 'xxxx'}
    
                var response = await postData('batch/edit_batch', body)
    
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
                  fetchAllBatch()
    
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
                  fetchAllBatch()
                }
    
            }
    
        };


    const showBatch = () => {
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
                            value={batchName}
                            helperText={error?.batchName}
                            error={error?.batchName}
                            onFocus={() => handleError('batchName', '')}
                        />
                    </div>
                </Grid>
                
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Session'
                            onChange={(e) => setSession(e.target.value)}
                            size="small"
                            value={session}
                            helperText={error?.session}
                            error={error?.session}
                            onFocus={() => handleError('session', '')}
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
    const fetchAllBatch = async () => {
        var response = await getData('batch/fetch_all_batch')
        setBatchList(response.data)
    }
    useEffect(function () {
        fetchAllBatch()
    }, [refresh])

    
    const handleDelete = async (bid) => {

        Swal.fire({
            title: "Do you want to Delete the selected batch ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('batch/delete_batch', { batchid: bid })
                Swal.fire(response.message);
                fetchAllBatch()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleOpenDialog = (rowData) => {
        setBatchId(rowData.batchid)
        setBranchId(rowData.branchid)
        setBatchName(rowData.batchname)
        setSession(rowData.session)
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
                    {showBatch()}
                </DialogContent>
            </Dialog>

        </div>)
    }

    const displaybatch = () => {
        return (<div>
            <MaterialTable
                title={`List of Batch,${branch?.branchname}`}
                columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Session', field: 'session' },
                    ]}
                data={batchList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.batchid)
                    },
                    
                ]}
            />
        </div>)
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displaybatch()}
        </div>
        {showDialog()}
    </div>)
}