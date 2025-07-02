import TextField from '@mui/material/TextField';
import { Fragment, useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import { Avatar } from '@mui/material';

const AddDepartmentUser = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    // const { loading, success, error } = useSelector((state) => state.newProduct);
    let loading = false;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [department, setDepartment] = useState("");
    const [subDepartment, setSubDepartment] = useState("");
    // const [avatar, setAvatar] = useState();
    // const [avatarPreview, setAvatarPreview] = useState("preview.png");
    const [departmentsList, setDepartmentsList] = useState([]);
    const [subDepartmentsList, setSubDepartmentsList] = useState([]);

    const [tabAccess, setTabAccess] = useState([
        { tab: 'Dashboard', permission: 'none' },
        { tab: 'Orders', permission: 'none' },
        { tab: 'Products', permission: 'none' },
        { tab: 'Category', permission: 'none' },
        { tab: 'Sub-category', permission: 'none' },
        { tab: 'Users', permission: 'none' },
        { tab: 'Reviews', permission: 'none' },
        { tab: 'Departments', permission: 'none' },
        { tab: 'Sub-departments', permission: 'none' },
        { tab: 'Department Users', permission: 'none' },
        { tab: 'coupon', permission: 'none' },
    ]);


    const handleTabPermissionChange = (index, event) => {
        const newTabAccess = [...tabAccess];
        newTabAccess[index].permission = event.target.value;
        setTabAccess(newTabAccess);
    };

    // const handleAvatarChange = (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             setAvatarPreview(reader.result);
    //             setAvatar(reader.result);
    //         }
    //     };
    //     reader.readAsDataURL(e.target.files[0]);
    // }


    const newUserSubmitHandler = async (e) => {
        e.preventDefault();

        // if (!avatar) {
        //     enqueueSnackbar("Select Avatar", { variant: "warning" });
        //     return;
        // }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", email);
        formData.set("mobile", mobile);
        formData.set("departmentId", department);
        formData.set("subdepartmentId", subDepartment);
        // formData.set("avatar", avatar);
        formData.set("tabAccess", JSON.stringify(tabAccess));

        const serverResponse = await adminCommunication.createDepartmentUser(formData);
        if (serverResponse?.data?.success) {
            navigate("/admin/department-users");
        }
    }

    const fetchDepartments = async () => {
        try {
            const response = await adminCommunication.getAllDepartments();
            if (response?.data?.success) {
                setDepartmentsList(response?.data?.departments);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
        }
    };


    const fetchSubDepartment = async () => {
        try {
            const response = await adminCommunication.getSubDepartmentByDepartment(department);
            if (response?.data?.success) {
                setSubDepartmentsList(response?.data?.subDepartments);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching subdepartment: " + error.message, { variant: "error" });
        }
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment); // Set the selected department
        setSubDepartment(''); // Reset sub-department
        fetchSubDepartment(selectedDepartment); // Fetch sub-departments based on selected department
      };


    useEffect(() => {
        fetchDepartments();
    }, []);

  

    return (
        <>
            <MetaData title="Admin: Add Department User | Flipkart" />

            {loading && <BackdropLoader />}
            <form onSubmit={newUserSubmitHandler} encType="multipart/form-data" className="justify-center sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <h1 className="text-lg font-medium uppercase">New Department User</h1>
                <div className="mt-8 sm:mx-auto gap-4 sm:w-full sm:max-w-md">
                    <div className="flex flex-col gap-3 m-2 mb-4 w-full">
                        {/* <h2 className="font-medium">Avatar</h2>
                    <div className="flex justify-between gap-4 mb-3 items-start">
                        <Avatar
                            alt="Avatar Preview"
                            src={avatarPreview}
                            sx={{ width: 56, height: 56 }}
                        />
                        <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            Choose File
                        </label>
                    </div> */}


                        <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Mobile"
                            variant="outlined"
                            size="small"
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />

                        <div className="flex justify-between gap-4">
                            <TextField
                                label="Department"
                                variant="outlined"
                                size="small"
                                select
                                fullWidth
                                required
                                value={department}
                                onChange={(e) => handleDepartmentChange(e)}
                            >
                                {departmentsList?.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Sub-Department"
                                variant="outlined"
                                size="small"
                                select
                                fullWidth
                                required
                                value={subDepartment}
                                onChange={(e) => setSubDepartment(e.target.value)}
                            >
                                {subDepartmentsList?.map((subDepartment) => (
                                    <MenuItem key={subDepartment._id} value={subDepartment._id}>
                                        {subDepartment.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-3 m-2 mb-4 w-full">
                    <h2 className="font-medium">Tab Access</h2>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Tab Name</div>
                        <div className="font-medium">Read</div>
                        <div className="font-medium">Write</div>
                        <div className="font-medium">None</div>

                        {tabAccess.map((tab, index) => (
                            <Fragment key={index}>
                                <div>{tab.tab}</div>
                                <div>
                                    <RadioGroup
                                        className="flex"
                                        name={`tab-${tab.tab}`}
                                        value={tab.permission}
                                        onChange={(e) => handleTabPermissionChange(index, e)}
                                    >
                                        <FormControlLabel value="read" control={<Radio />} label="Read" />
                                    </RadioGroup>
                                </div>
                                <div>
                                    <RadioGroup
                                        className="flex"
                                        name={`tab-${tab.tab}`}
                                        value={tab.permission}
                                        onChange={(e) => handleTabPermissionChange(index, e)}
                                    >
                                        <FormControlLabel value="write" control={<Radio />} label="Write" />
                                    </RadioGroup>
                                </div>
                                <div>
                                    <RadioGroup
                                        className="flex"
                                        name={`tab-${tab.tab}`}
                                        value={tab.permission}
                                        onChange={(e) => handleTabPermissionChange(index, e)}
                                    >
                                        <FormControlLabel value="none" control={<Radio />} label="None" />
                                    </RadioGroup>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
                </div>

            </form>
        </>
    );
};

export default AddDepartmentUser;
