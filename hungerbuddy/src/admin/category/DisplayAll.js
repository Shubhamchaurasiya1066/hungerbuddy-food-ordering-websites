import React from 'react'
import MaterialTable from "@material-table/core";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import burger from '../../assets/burger.png'
import { useState, useEffect } from "react";
import EditIconComponent from '../../components/EditIconComponents';
import ClearIcon from '@mui/icons-material/Clear';
import { getData, serverURL, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material"
import Swal from 'sweetalert2';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    box: {
        width: '70%',
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
export default function DisplayAll({ refresh, setRefresh }) {
    var classes = useStyles()
    const [categoryList, setCatgoryList] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryIcon, setCategoryIcon] = useState({ bytes: '', fileName: burger })
    const [diologState, setdiologState] = useState('')
    const [statusButton, setStatusButton] = useState(false)
    const [tempImage, setTempImage] = useState('')
    /***********************Category View */

    const [branchId, setBranchId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState({ fileError: null })
    const handleError = (label, message) => {

        setError((prev) => ({ ...prev, [label]: message }))

    }

    const validation = () => {
        var isError = false
        if (categoryName.length == 0) {
            setError((prev) => ({ ...prev, 'categoryName': 'Pls Input Category Name...' }))
            isError = true
        }

        return isError
    }

    useEffect(() => {
        fetchAllCategory()
    }, [refresh])

    const handleClick = async () => {
        var error = validation()
        if (error == false) {
            var body =
            {
                'categoryid': categoryId,
                'branchid': branchId,
                'categoryname': categoryName,
                'createddate': getDate(),
                'createdtime': getTime(),
                'userid': 'xxxxx',

            }

            //    var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('category/edit_category', body)
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
                fetchAllCategory()
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
                fetchAllCategory()
            }

        }

    }

    const handleChange = (e) => {
        setCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        setStatusButton(true)
    }

    const showPictureInterface = () => {
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Add Picture</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton onClick={handleCloseDialog} aria-label="delete" style={{ display: 'flex', marginLeft: 'auto' }}>
                                <ClearIcon style={{ color: '#ffff' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={6}>
                    <img src={categoryIcon.fileName} style={{ width: 100, borderRadius: 5 }} />
                </Grid>
                <Grid size={6} style={{ display: 'flex', alignItems: 'center' }}>
                    {statusButton ? saveCancelbutton() : <></>}
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth endIcon={<CloudUploadIcon />} component='label' variant='contained' style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            Category Icon
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    }

    const showCategoryInterface = () => {
        return (




            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Add Category</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton onClick={handleCloseDialog} aria-label="delete" style={{ display: 'flex', marginLeft: 'auto' }}>
                                <ClearIcon style={{ color: '#ffff' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField onChange={(e) => setBranchId(e.target.value)} fullWidth label='Branch Name'
                            value={branchId}
                            helperText={error.branchId}
                            error={error.branchId}
                            onFocus={() => handleError('branchId', '')}
                        />
                    </div>
                </Grid>

                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField onChange={(e) => setCategoryName(e.target.value)} fullWidth label='Category Name'
                            value={categoryName}
                            helperText={error.categoryName}
                            error={error.categoryName}
                            onFocus={() => handleError('categoryName', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>

                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button onClick={handleClick} fullWidth variant="contained" style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            Edit
                        </Button>
                    </div>

                </Grid>
                <Grid size={6}>

                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth variant="contained" style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            Delete
                        </Button>
                    </div>

                </Grid>

            </Grid>

        )

    }


    /***************************/
    const fetchAllCategory = async () => {
        var response = await getData('category/fetch_all_category')
        setCatgoryList(response.data)

    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const showDialog = () => {

        return (<div>
            <Dialog open={open}
                onClose={handleCloseDialog}
            >




                <DialogContent>
                    {diologState == 'Data' ? showCategoryInterface() : showPictureInterface()}

                </DialogContent>
            </Dialog>

        </div>)
    }

    const handleCancel = () => {
        setCategoryIcon({ fileName: tempImage, bytes: '' })
        setStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('categoryicon', categoryIcon.bytes)
        formData.append('createddate', getDate())
        formData.append('createdtime', getTime())
        formData.append('userid', 'xxxxx')

        //    var body={categoryid:categoryIcon,categoryname:categoryName}
        var response = await postData('category/edit_picture', formData)

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
            fetchAllCategory()
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
            fetchAllCategory()
        }
    }
    const saveCancelbutton = () => {
        return <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
            <Button onClick={handleEditPicture} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Save</Button>
            <Button onClick={handleCancel} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Cancel</Button>
        </div>
    }

    const handleOpenDialog = (rowData, status) => {
        setdiologState(status)
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setCategoryIcon({ fileName: `${serverURL}/images/${rowData.categoryicon}`, bytes: '' })
        setTempImage(`${serverURL}/images/${rowData.categoryicon}`)
        setBranchId(rowData.branchid)
        setOpen(true)
    }
    const handleCloseDialog = (rowData) => {
        setOpen(false)
    }

    const handleDelete = async (cid) => {

        Swal.fire({
            title: "Do you want to Delete the selected category ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('category/delete_category', { categoryid: cid })
                Swal.fire("Saved!", "", "success");
                fetchAllCategory()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }


    const displayCategory = () => {


        return (<div>

            <MaterialTable
                title='List of Food Categories'
                columns={[
                    { title: 'Branch Id', field: 'branchid' },
                    { title: 'Category Name', field: 'categoryname' },
                    {
                        title: 'Icon', field: 'categoryicon', render: (rowData) => (
                            <div onClick={() => handleOpenDialog(rowData, "Picture")}> <EditIconComponent image={rowData.categoryicon} /></div>
                        )
                    }]}

                data={categoryList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, "Data")
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.categoryid)
                    }
                ]}
            />

        </div>)
    }


    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayCategory()}
        </div>
        {showDialog()}
    </div>)

}