import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
// import { createProduct, clearErrors } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
// import { createProduct } from '../../service/adminCommunication/createProduct';
import { adminCommunication } from '../../service/adminCommunication';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const UpdateDepartment = () => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams()

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    let loading = false

    const [name, setName] = useState("");

    const updateDepartmentSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("id", params.id)
        formData.set("name", name);
        try {
            const serverResponse = await adminCommunication.updateDepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Department Updated Successfully", { variant: "success" });
                navigate("/admin/department");
            } else {
                enqueueSnackbar("Failed to create department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        }
    }

    const handleClick = () => {
        navigate("/admin/department")
    }

    const departmentId = params.id

    useEffect(() => {
        const fetchDepartmentDetails = async () => {
            try {
                const response = await adminCommunication.getDepartmentById(departmentId);
                if (response?.data?.success) {
                    const fetchedDepartment = response?.data?.department;
                    setName(fetchedDepartment.name);
                }
            } catch (error) {
                enqueueSnackbar("Error fetching products: " + error.message, { variant: "error" });
            } 
        }

        fetchDepartmentDetails()
    }, [params?.id, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Department | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <Link to="/admin/department" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Department</h2>
                <form onSubmit={updateDepartmentSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
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
                            <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium" value="submit">Update</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default UpdateDepartment;
