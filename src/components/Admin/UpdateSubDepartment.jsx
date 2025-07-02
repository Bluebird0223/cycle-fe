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

const UpdateSubDepartment = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    let loading = false

    const [name, setName] = useState("");
    const [department, setDepartment] = useState('');
    const [departmentsList, setDepartmentsList] = useState([]);


    const updateSubdepartmentSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("id", params.id);
        formData.set("name", name);
        formData.set("departmentId", department);

        try {
            console.log("formData", ...formData);
            const serverResponse = await adminCommunication.updateSubdepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Sub Department Updated Successfully", { variant: "success" });
                navigate("/admin/subdepartment");
            } else {
                enqueueSnackbar("Failed to update sub department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        }
    };

    const handleClick = () => {
        navigate("/admin/subdepartment");
    };

    const subDepartmentId = params.id;

    useEffect(() => {
        // Fetch the subdepartment details based on the ID in the URL
        const fetchSubdepartmentDetails = async () => {
            try {
                const response = await adminCommunication.getSubdepartmentById(subDepartmentId);
                if (response?.data?.success) {
                    const fetchedDepartment = response?.data?.subDepartment;
                    setDepartment(fetchedDepartment.department._id);
                    setName(fetchedDepartment.name);
                }
            } catch (error) {
                enqueueSnackbar("Error fetching subdepartment: " + error.message, { variant: "error" });
            }
        };

        // Fetch all categories for the dropdown
        const fetchDepartments = async () => {
            try {
                const response = await adminCommunication.getAllDepartments();
                if (response?.data?.success) {
                    setDepartmentsList(response.data.departments);
                }
            } catch (error) {
                enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
            }
        };

        fetchSubdepartmentDetails();
        fetchDepartments();
    }, [subDepartmentId, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Subdepartment | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <Link to="/admin/subdepartment" className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"><ArrowBackIosIcon sx={{ fontSize: "18px" }} />Go Back</Link>
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Sub Department</h2>
                <form onSubmit={updateSubdepartmentSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                            <TextField
                                label="Sub Department Name"
                                variant="outlined"
                                size="small"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                label="Department"
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                required
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                {departmentsList?.map((department) => (
                                    <MenuItem key={department._id} value={department._id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </TextField>


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

export default UpdateSubDepartment;
