import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import publicCommunication from "../../service/publicCommunication";
import { setCookie } from "cookies-next";
import {
    clearErrors,
    loginFail,
    loginRequest,
    loginSuccess,
} from "../../store/userSlice";
import { adminCommunication } from "../../service/adminCommunication";

const DeptLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector(
        (state) => state.user
    );

    const [showPassword, setShowPassword] = useState(false);

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let dataToSend = {
                userId,
                password

            }
            console.log(dataToSend)
            // return
            // dispatch(loginRequest());
            const serverResponse = await adminCommunication?.deptLoginUser(dataToSend);

            if (serverResponse?.data?.success) {
                // set token and user details in cookies
                enqueueSnackbar("Login Successful", { variant: "success" });
                if (serverResponse?.data?.user?.role === "DeptUser") {
                    setCookie(
                        process.env.REACT_APP_DEPT_TOKENNAME,
                        serverResponse?.data?.token
                    );
                    setCookie(process.env.REACT_APP_DEPTDETAILS, serverResponse?.data?.user);
                    navigate("/admin/dashboard");
                } else {
                    // add user data in  the user state of redux
                    dispatch(loginSuccess(serverResponse?.data?.user));
                    let userDetails = {
                        id: serverResponse?.data?.user?._id,
                        avatar: serverResponse?.data?.user?.avatar,
                        useRId: serverResponse?.data?.user?.userId,
                        gender: serverResponse?.data?.user?.gender,
                        name: serverResponse?.data?.user?.name,
                        role: serverResponse?.data?.user?.role,
                    };

                    setCookie(process.env.REACT_APP_USERDETAILS, userDetails);
                    setCookie(
                        process.env.REACT_APP_TOKENNAME,
                        serverResponse?.data?.token
                    );
                    navigate("/");
                }
            } else {
                dispatch(loginFail(serverResponse?.data?.message));
            }
        } catch (error) {
            dispatch(loginFail(error?.message));
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`);
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Department Login | KanchanDeepJyot" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-5 sm:pt-7 sm:mt-0 bg-primary-beige pb-5 pattern-section">
                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-2 m-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* <!-- sidebar column  --> */}
                    <div className="loginSidebar bg-primary-blue p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5">
                        <h1 className="font-medium text-white text-3xl">Department Login</h1>
                        <p className="text-gray-200 text-lg">
                            Access Your Orders, Wishlist, and Personalized Recommendations
                        </p>
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">
                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">
                            {/* <!-- input container --> */}
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">
                                    <TextField
                                        fullWidth
                                        id="userId"
                                        label="User Id"
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => handleTogglePasswordVisibility()}
                                                        edge="end"
                                                        aria-label="toggle password visibility"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Email ID/Mobile number</span> */}

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-primary-grey text-left">
                                            By continuing, you agree to KanchanDeepJyot's
                                            <a href="/privacy-policy" className="text-primary-blue">
                                                &nbsp; Privacy Policy.
                                            </a>
                                        </p>
                                        <button
                                            type="submit"
                                            className="text-white py-3 w-full bg-primary-blue shadow hover:shadow-lg rounded-sm font-medium"
                                        >
                                            Login
                                        </button>
                                        <Link
                                            to="/password/forgot"
                                            className="hover:bg-gray-50 text-red-800 text-center py-3 w-full shadow border rounded-sm font-medium"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    {/* <!-- button container --> */}
                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            {/* <Link
                                to="/register"
                                className="font-medium text-sm text-red-800"
                            >
                                New to KanchanDeepJyot? Create an account
                            </Link> */}
                        </div>
                        {/* <!-- edit info container --> */}
                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default DeptLogin;
