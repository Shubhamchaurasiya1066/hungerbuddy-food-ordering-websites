import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import burger from "../../assets/burger.png";
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
export default function FoodItems() {
    var classes = useStyles()
    var branch = JSON.parse(localStorage.getItem('Branch'))
    var category = JSON.parse(localStorage.getItem('Category'))
    const [branchId, setBranchId] = useState(branch?.branchid);
    const [branchName, setBranchName] = useState(branch?.branchname);
    const [foodCategoryId, setFoodCategoryId] = useState(category?.categoryid)
    const [foodCategoryName, setFoodCategoryName] = useState(category?.categoryname)
    const [foodItemId, setFoodItemId] = useState('')
    const [foodItemName, setFoodItemName] = useState('')
    const [foodItemType, setFoodItemType] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [foodItemTaste, setFoodItemtaste] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [fullPrice, setFullPrice] = useState('')
    const [halfPrice, setHalfprice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [status, setStatus] = useState('')
    const [ratings, setRatings] = useState(5)
    const [picture, setPicture] = useState({ bytes: '', fileName: burger })
    const [error, setError] = useState({ fileError: null })

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
        if (ratings.length == 0) {
            setError((prev) => ({ ...prev, 'ratings': 'Pls Input Ratings' }))
            isError = true
        }
        if (picture.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'fileError': 'Pls Input Picture' }))
            isError = true
        }

        return isError
    }

    const handleChange = (e) => {
        setPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

        setError((prev) => ({ ...prev, 'fileError': null }))
    }
    const fetchAllCategoryName = async () => {
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
            var formData = new FormData();
            formData.append("branchid", branchId)
            formData.append("foodcategoryid", foodCategoryId)
            formData.append("fooditemname", foodItemName);
            formData.append("fooditemtype", foodItemType);
            formData.append("fooditemtaste", foodItemTaste);
            formData.append("ingredients", ingredients);
            formData.append("fullprice", fullPrice)
            formData.append("halfprice", halfPrice)
            formData.append("offerprice", offerPrice)
            formData.append("status", status)
            formData.append("ratings", ratings)
            formData.append("picture", picture.bytes);
            formData.append("createddate", getDate());
            formData.append("createdtime", getTime());
            formData.append("userid", 'xxxx');

            //var body={categoryid:categoryIcon,categoryname:categoryName}
            var response = await postData('fooditem/submit_fooditem', formData)

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
                            <Select label='Category Name' value={foodCategoryName} onChange={(e) => setFoodCategoryId(e.target.value)}>
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
                            <Select label='Food Type' onChange={(e) => setFoodItemType(e.target.value)}
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
                            <Select label='Food Taste' onChange={(e) => setFoodItemtaste(e.target.value)}
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
                            helperText={error?.fullPrice}
                            error={error?.fullPrice}
                            onFocus={() => handleError('fullPrice', '')}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: '0px 5px 0px 5px' }}>
                        <TextField fullWidth label='Ingredients'
                            onChange={(e) => setIngredients(e.target.value)}
                            size="small"
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
                            <Select label='Status' onChange={(e) => setStatus(e.target.value)}
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

                        <Button
                            style={{ background: "hsla(321, 32%, 37%, 1.00)" }}
                            component='label'
                            variant="contained"
                            fullWidth
                            size="small"
                            endIcon={<CloudUploadIcon style={{ fontSize: 34 }} />}
                        >
                            Food Icon
                            <input onChange={handleChange} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <img src={picture.fileName} style={{ width: 30 }} />
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