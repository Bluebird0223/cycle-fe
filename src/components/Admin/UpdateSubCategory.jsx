import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const UpdateSubcategory = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    let loading = false

    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [category, setCategory] = useState('');
    const [logoPreview, setLogoPreview] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);

    const handleLogoChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const updateSubcategorySubmitHandler = async (e) => {
        e.preventDefault();
        if (!logo) {
            enqueueSnackbar("Add sub category image", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("id", params.id);
        formData.set("name", name);
        formData.set("image", logo);
        formData.set("category", category);

        try {
            console.log("formData", ...formData);
            const serverResponse = await adminCommunication.updateSubcategory(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Category Updated Successfully", { variant: "success" });
                navigate("/admin/subcategory");
            } else {
                enqueueSnackbar("Failed to update category", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        }
    };

    const handleClick = () => {
        navigate("/admin/subcategory");
    };

    const subCategoryId = params.id;

    useEffect(() => {
        // Fetch the subcategory details based on the ID in the URL
        const fetchSubcategoryDetails = async () => {
            try {
                const response = await adminCommunication.getSubcategoryById(subCategoryId);
                if (response?.data?.success) {
                    const fetchedCategory = response?.data?.category;
                    setCategory(fetchedCategory.category._id);
                    setName(fetchedCategory.name);
                    setLogo(fetchedCategory?.image[0]?.url);
                    if (fetchedCategory.image && fetchedCategory.image.length > 0) {
                        setLogoPreview(fetchedCategory.image[0].url);
                    }
                }
            } catch (error) {
                enqueueSnackbar("Error fetching subcategory: " + error.message, { variant: "error" });
            }
        };

        // Fetch all categories for the dropdown
        const fetchCategories = async () => {
            try {
                const response = await adminCommunication.getAllCategory();
                if (response?.data?.success) {
                    setCategoriesList(response.data.category);
                }
            } catch (error) {
                enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
            }
        };

        fetchSubcategoryDetails();
        fetchCategories();
    }, [subCategoryId, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Subcategory | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <Link to="/admin/subcategory" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Sub Category</h2>
                <form onSubmit={updateSubcategorySubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Sub Category Name"
                                variant="outlined"
                                size="small"
                                fullWidth
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
                                {categoriesList?.map((category) => (
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
                            <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium" value="submit">Update Sub Category</button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default UpdateSubcategory;
