import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';
import EditIconComponent from '../../components/EditIconComponents';
import burger from "../../assets/burger.png";
import { Navigate, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
export default function DisplayFoodItem() {
    var classes = useStyles()
    var navigate = useNavigate()
    const [foodItemList, setFoodItemList] = useState([])
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ fileError: null })
    const [diologState, setdiologState] = useState('')
    const [statusButton, setStatusButton] = useState(false)
    const [tempImage, setTempImage] = useState('')
    /***********Food item View*************/
    var branch = JSON.parse(localStorage.getItem('Branch'))
    var category = JSON.parse(localStorage.getItem('Category'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const[foodCategoryId,setFoodCategoryId]=useState(category?.categoryid)
    const[foodCategoryName,setFoodCategoryName]=useState(category?.categoryname)
    const [foodItemId, setFoodItemId] = useState('')
    const[categoryList,setCategoryList]=useState([])
    const [foodItemName, setFoodItemName] = useState('')
    const [foodItemType, setFoodItemType] = useState('')
    const [foodItemTaste, setFoodItemtaste] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [fullPrice, setFullPrice] = useState('')
    const [halfPrice, setHalfprice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [status, setStatus] = useState('')
    const [ratings, setRatings] = useState('')
    const [picture, setPicture] = useState({ bytes: '', fileName: burger })


    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false
        if (foodItemName.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemName': 'Pls Input Food Item name' }))
            isError = true
        }
        if (foodItemType.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemType': 'Pls Input Food Item Type' }))
            isError = true
        }
        if (foodItemTaste.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemTaste': 'Pls Input Food Item Taste' }))
            isError = true
        }
        if (ingredients.length == 0) {
            setError((prev) => ({ ...prev, 'ingredients': 'Pls Input Ingredients' }))
            isError = true
        }
        if (fullPrice.length == 0) {
            setError((prev) => ({ ...prev, 'fullPrice': 'Pls Input Full Price' }))
            isError = true
        }
        if (halfPrice.length == 0) {
            setError((prev) => ({ ...prev, 'halfPrice': 'Pls Input Half Price' }))
            isError = true
        }
        if (offerPrice.length == 0) {
            setError((prev) => ({ ...prev, 'offerPrice': 'Pls Input Offer Price' }))
            isError = true
        }
        if (status.length == 0) {
            setError((prev) => ({ ...prev, 'status': 'Pls Input Status' }))
            isError = true
        }
        // if (ratings.length == 0) {
        //     setError((prev) => ({ ...prev, 'ratings': 'Pls Input Ratings' }))
        //     isError = true
        // }
        // if (picture.bytes.length == 0) {
        //     setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
        //     isError = true
        // }

        return isError
    }

    const handleChange = (e) => {
        setPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

        setError((prev) => ({ ...prev, 'fileError': null }))
        setStatusButton(true)
    }

    const fetchAllCategoryName = async (cid) => {
        var res = await getData('fooditem/fetch_categoryname')
        setCategoryList(res.data)

    }


    useEffect(function () {
        fetchAllCategoryName()
    }, [])
    const fillCategoryName = () => {
        return categoryList?.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
    }

    const handleClick = async () => {
        var err = validation()
        if (err == false) {

            var body = {
                "fooditemid": foodItemId,
                "branchid": branchId,
                "foodcategoryid": foodCategoryId,
                "fooditemname": foodItemName,
                "fooditemtype": foodItemType,
                "fooditemtaste": foodItemTaste,
                "ingredients": ingredients,
                "fullprice": fullPrice,
                "halfprice": halfPrice,
                "offerprice": offerPrice,
                "status": status,
                "ratings": '5',
                "createddate": getDate(),
                "createdtime": getTime(),
                "userid": 'xxxx'
            }
            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('fooditem/edit_fooditem', body)

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
                fetchAllFoodItem()

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
                            <IconButton onClick={handleCloseDialog} aria-label="delete" style={{ display: 'flex', marginLeft: 'auto',color: '#251010ff'  }}>
                                <ClearIcon style={{ color: '#251010ff' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={6}>
                    <img src={picture.fileName} style={{ width: 100, borderRadius: 5 }} />
                </Grid>
                <Grid size={6} style={{ display: 'flex', alignItems: 'center' }}>
                    {statusButton ? saveCancelbutton() : <></>}
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <Button fullWidth endIcon={<CloudUploadIcon />} component='label' variant='contained' style={{ background: 'hsla(316, 17%, 35%, 1.00)' }}>
                            Food Icon
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
            </Grid>

        </div>
    }


    const showFoodItem = () => {
        return (

            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div className={classes.titleBox}>
                            <div className={classes.subTitleStyle}>HungerBuddy</div>
                            <div className={classes.titleStyle}>Food Items</div>
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
                        <FormControl fullWidth size="small">
                            <InputLabel>Category Name</InputLabel>
                            <Select label='Category Name' value={foodCategoryId} onChange={(e) => setFoodCategoryId(e.target.value)}>
                                <MenuItem>-Select-</MenuItem>
                                {fillCategoryName()}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Fooditem Name'
                            onChange={(e) => setFoodItemName(e.target.value)}
                            value={foodItemName}
                            size="small"
                            helperText={error?.foodItemName}
                            error={error?.foodItemName}
                            onFocus={() => handleError('foodItemName', '')}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Food Type</InputLabel>
                            <Select label='Food Type' value={foodItemType} onChange={(e) => setFoodItemType(e.target.value)}
                                helperText={error?.foodItemType}
                                error={error?.foodItemType}
                                onFocus={() => handleError('foodItemType', '')}>
                                <MenuItem>-Select-</MenuItem>
                                <MenuItem value="Veg">Veg</MenuItem>
                                <MenuItem value="Non Veg">Non Veg</MenuItem>
                                <MenuItem value="Vegan">Vegan</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Food Taste</InputLabel>
                            <Select label='Food Taste' value={foodItemTaste} onChange={(e) => setFoodItemtaste(e.target.value)}
                                helperText={error?.foodItemTaste}
                                error={error?.foodItemTaste}
                                onFocus={() => handleError('foodItemTaste', '')}>
                                <MenuItem>-Select-</MenuItem>
                                <MenuItem value="Spicy">Spicy</MenuItem>
                                <MenuItem value="Non Spicy">Non Spicy</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Full Price'
                            onChange={(e) => setFullPrice(e.target.value)}
                            size="small"
                            value={fullPrice}
                            helperText={error?.fullPrice}
                            error={error?.fullPrice}
                            onFocus={() => handleError('fullPrice', '')}
                        />
                    </div>
                </Grid>
                <Grid size={12}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Ingredients'
                            onChange={(e) => setIngredients(e.target.value)}
                            size="small"
                            value={ingredients}
                            helperText={error?.ingredients}
                            error={error?.ingredients}
                            onFocus={() => handleError('ingredients', '')}
                        />
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Half Price'
                            onChange={(e) => setHalfprice(e.target.value)}
                            size="small"
                            value={halfPrice}
                            helperText={error?.halfPrice}
                            error={error?.halfPrice}
                            onFocus={() => handleError('halfPrice', '')}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Offer Price'
                            onChange={(e) => setOfferPrice(e.target.value)}
                            size="small"
                            value={offerPrice}
                            helperText={error?.offerPrice}
                            error={error?.offerPrice}
                            onFocus={() => handleError('offerPrice', '')}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select label='Status' value={status} onChange={(e) => setStatus(e.target.value)}
                                helperText={error?.status}
                                error={error?.status}
                                onFocus={() => handleError('status', '')}>
                                <MenuItem>-Select-</MenuItem>
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Not Available">Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>

                <Grid size={6}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <Button variant="contained" size="medium" fullWidth style={{ background: "hsla(321, 32%, 37%, 1.00)" }} onClick={handleClick}>
                            Edit
                        </Button>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <Button variant="contained" size="medium" fullWidth style={{ background: "hsla(321, 32%, 37%, 1.00)" }}>
                            Delete
                        </Button>
                    </div>

                </Grid>


            </Grid>



        )
    }


    /*************************/
    const fetchAllFoodItem = async () => {
        var response = await getData('fooditem/fetch_all_fooditem')
        setFoodItemList(response.data)
    }
    useEffect(function () {
        fetchAllFoodItem()
    }, [])

    const handleCancel = () => {
        setPicture({ fileName: tempImage, bytes: '' })
        setStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData()
        formData.append('fooditemid', foodItemId)
        formData.append('picture', picture.bytes)
        formData.append('createddate', getDate())
        formData.append('createdtime', getTime())
        formData.append('userid', 'xxxxx')

        //    var body={categoryid:categoryIcon,categoryname:categoryName}
        var response = await postData('fooditem/edit_foodpicture', formData)

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
            fetchAllFoodItem()
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
            fetchAllFoodItem()
        }
    }

    const saveCancelbutton = () => {
        return <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
            <Button onClick={handleEditPicture} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Save</Button>
            <Button onClick={handleCancel} style={{ background: 'hsla(316, 17%, 35%, 1.00)' }} variant='contained'>Cancel</Button>
        </div>
    }

    const handleDelete = async (cid) => {

        Swal.fire({
            title: "Do you want to Delete the selected category ",

            showCancelButton: true,
            confirmButtonText: "Delete",

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                var response = await postData('fooditem/delete_fooditem', { fooditemid: cid })
                Swal.fire(response.message);
                fetchAllFoodItem()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleOpenDialog = (rowData, status) => {
        setdiologState(status)
        setFoodItemId(rowData.fooditemid)
        setBranchId(rowData.branchid)
        setFoodCategoryId(rowData.foodcategoryid)
        setFoodItemName(rowData.fooditemname)
        setFoodItemType(rowData.fooditemtype)
        setFoodItemtaste(rowData.fooditemtaste)
        setFullPrice(rowData.fullprice)
        setIngredients(rowData.ingredients)
        setHalfprice(rowData.halfprice)
        setOfferPrice(rowData.offerprice)
        setStatus(rowData.status)
        setRatings(rowData.ratings)
        setPicture({ fileName: `${serverURL}/images/${rowData.picture}`, bytes: '' })
        setTempImage(`${serverURL}/images/${rowData.picture}`)
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
                    {diologState == 'Data' ? showFoodItem() : showPictureInterface()}
                </DialogContent>
            </Dialog>

        </div>)
    }

    const displayfoodItem = () => {
        return (<div>
            <MaterialTable
                title={`List of Food Items,${branch?.branchname}`}
                columns={[
                    { title: 'Category', field: 'foodcategoryname' },
                    { title: 'Food Name',render:(rowData)=>(<div>{rowData.fooditemname}({rowData.fooditemtype})</div>)},                   
                    { title: 'Taste', field: 'fooditemtaste' },
                    { title: 'Full/Half', render:(rowData)=>(<div>&#8377;{rowData.fullprice}/&#8377;{rowData.halfprice}</div>) },
                    { title: 'Offer', render:(rowData)=>(<div>&#8377;{rowData.offerprice}</div>) },
                    { title: 'Status', field: 'status' },
                    { title: 'Ratinges', field: 'ratings' },
                    {
                        title: 'Picture', render: (rowData) => <div onClick={() => handleOpenDialog(rowData, "Picture")}> <EditIconComponent image={rowData.picture} /></div>
                    }]}
                data={foodItemList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDelete(rowData.fooditemid)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Food Items',
                        isFreeAction: true,
                        onClick: (event) => navigate('/branchdashboard/fooditem')
                    }
                ]}
            />
        </div>)
    }
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayfoodItem()}
        </div>
        {showDialog()}
    </div>)
}