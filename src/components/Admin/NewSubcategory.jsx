import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
// import { createProduct, clearErrors } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
// import { createProduct } from '../../service/adminCommunication/createProduct';
import { adminCommunication } from '../../service/adminCommunication';

// import Select, { SelectChangeEvent } from '@mui/material/Select';

const AddSubcategory = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    let loading = false

    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [category, setCategory] = useState('');
    const [logoPreview, setLogoPreview] = useState("");
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleLogoChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }
    const newProductSubmitHandler = async (e) => {
        e.preventDefault();
        if (!logo) {
            enqueueSnackbar("Add sub category image", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("image", logo);
        formData.set("category", category);
        try {
            // console.log(...formData)
            const serverResponse = await adminCommunication.createSubcategory(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Category Created Successfully", { variant: "success" });
                navigate("/admin/subcategory");
            } else {
                enqueueSnackbar("Failed to create category", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            console.log('finally')
        }

    }

    const getCategoryList = async () => {
        try {
            const serverResponse = await adminCommunication.getAllCategory();
            if (serverResponse?.data?.success) {
                setCategories(serverResponse?.data?.category);
            } else {
                enqueueSnackbar("Failed to fetch categories", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error fetching categories: ${error.message}`, { variant: "error" });
        }
    }

    useEffect(() => {
        getCategoryList()
    }, [])

    // useEffect(() => {
    //     getCategoryList()
    //     if (error) {
    //         enqueueSnackbar(error, { variant: "error" });
    //         // dispatch(clearErrors());
    //     }
    //     if (success) {
    //         enqueueSnackbar("Product Created", { variant: "success" });
    //         dispatch({ type: NEW_PRODUCT_RESET });
    //         navigate("/admin/category");
    //     }
    // }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Subcategory | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
            <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Sub Category</h2>
                <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Sub Category Name"
                                variant="outlined"
                                fullWidth
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                label="Category"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>


                            <h2 className="font-medium">Category Image</h2>
                            <div className="flex justify-between gap-4 items-start">
                                <div className="w-24 h-25 flex items-center justify-center border rounded-lg p-1">
                                    {!logoPreview ? <ImageIcon /> :
                                        <img draggable="false" src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain" />
                                    }
                                </div>
                                <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                                    <input
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="hidden"
                                    />
                                    Choose Image
                                </label>
                            </div>

                            {/* <div className="flex justify-end">
                                <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                            </div> */}
                            <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium" value="submit">Submit</button>
                        </div>

                    </div>

                </form>

            </div>
        </>
    );
};

export default AddSubcategory;
