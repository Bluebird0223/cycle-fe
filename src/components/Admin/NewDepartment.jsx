import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
// import { createProduct, clearErrors } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
// import { createProduct } from '../../service/adminCommunication/createProduct';
import { adminCommunication } from '../../service/adminCommunication';

const AddDepartment = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    let loading = false
    let success
    let error

    const [name, setName] = useState("");

    const newDepartmentSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        try {
            // setLoading(true); 
            const serverResponse = await adminCommunication.createDepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Department Created Successfully", { variant: "success" });
                navigate("/admin/department");
            } else {
                enqueueSnackbar("Failed to create department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            console.log('finally')
            // setLoading(false); 
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            // dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/department");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Department | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Department</h2>
                <form onSubmit={newDepartmentSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">

                    <div className="flex flex-col gap-3 items-start">

                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Department Name"
                                variant="outlined"
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            {/* <div className="flex justify-end">
                                <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                            </div> */}
                            <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium" value="submit">Submit</button>
                            <Link className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium" to="/admin/department">Cancel</Link>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default AddDepartment;
