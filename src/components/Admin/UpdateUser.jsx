import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { clearErrors, getUserDetails, updateUser } from '../../actions/userAction';
import { UPDATE_USER_RESET, REMOVE_USER_DETAILS } from '../../constants/userConstants';
import Loading from './Loading';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';

const UpdateUser = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();


    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const userId = params.id;

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("role", role);

        dispatch(updateUser(userId, formData));
    }

    useEffect(() => {
        // if (user && user._id !== userId) {
        //     dispatch(getUserDetails(userId));
        // } else {
        //     setName(user.name);
        //     setEmail(user.email);
        //     setGender(user.gender);
        //     setRole(user.role);
        //     // setAvatarPreview(user.avatar.url);
        // }
        // if (error) {
        //     enqueueSnackbar(error, { variant: "error" });
        //     dispatch(clearErrors());
        // }
        // if (updateError) {
        //     enqueueSnackbar(updateError, { variant: "error" });
        //     dispatch(clearErrors());
        // }
        // if (isUpdated) {
        //     enqueueSnackbar("User Updates Successfully", { variant: "success" });
        //     dispatch({ type: UPDATE_USER_RESET });
        //     dispatch({ type: REMOVE_USER_DETAILS });
        //     navigate("/admin/users");
        // }

        const getUserDetails = async () => {
            try {
                const response = await adminCommunication.getUserById(userId);
                if (response?.data?.success) {
                    setUser(response?.data?.user);
                    setName(response?.data?.user?.name);
                    setEmail(response?.data?.user?.email);
                    setGender(response?.data?.user?.gender);
                    setRole(response?.data?.user?.role);
                    setAvatarPreview(response?.data?.user?.avatar?.url);
                }
            } catch (error) {
                enqueueSnackbar("Error fetching products: " + error.message, { variant: "error" });
            } 
        }
        getUserDetails();

    }, []);

    return (
        <>
            <MetaData title="Admin: Update User | Flipkart" />

            {updateLoading && <BackdropLoader />}

            {loading ? <Loading /> : (
                <>
                    <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Profile</h2>

                        <form
                            onSubmit={updateUserSubmitHandler}
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-3 items-start">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- gender input --> */}
                                <div className="flex gap-4 items-center">
                                    <h2 className="text-md">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <TextField
                                        label="Role"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        required
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value={"user"}>User</MenuItem>
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                    </TextField>
                                </div>

                                <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Update</button>
                                <Link className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium" to="/admin/users">Cancel</Link>
                            </div>

                        </form>

                    </div>
                </>
            )}
        </>
    );
};

export default UpdateUser;
