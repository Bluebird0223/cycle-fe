import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';

const AddSubDepartment = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    let loading = false

    const [name, setName] = useState("");
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);

    const handleChange = (e) => {
        setDepartment(e.target.value);
    };

    const newProductSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("departmentId", department);
        try {
            const serverResponse = await adminCommunication.createSubDepartment(formData);
            if (serverResponse?.data?.success) {
                enqueueSnackbar("Sub Department Created Successfully", { variant: "success" });
                navigate("/admin/subdepartment");
            } else {
                enqueueSnackbar("Failed to create department", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
        } finally {
            console.log('finally')
        }

    }

    const getDepartmentList = async () => {
        try {
            const serverResponse = await adminCommunication.getAllDepartments();
            if (serverResponse?.data?.success) {
                setDepartments(serverResponse?.data?.departments);
            } else {
                enqueueSnackbar("Failed to fetch categories", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Error fetching categories: ${error.message}`, { variant: "error" });
        }
    }

    useEffect(() => {
        getDepartmentList()
    }, [])

    return (
        <>
            <MetaData title="Admin: New Subdepartment | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Sub Department</h2>
                <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="p-5 sm:p-10">

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
                                {departments.map((department) => (
                                    <MenuItem key={department._id} value={department._id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* <div className="flex justify-end">
                                <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                            </div> */}
                            <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium" value="submit">Submit</button>
                            <Link className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium" to="/admin/subdepartment">Cancel</Link>
                        </div>
                    </div>

                </form>


            </div>
        </>
    );
};

export default AddSubDepartment;
