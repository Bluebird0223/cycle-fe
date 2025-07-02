import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";
import { fetchUserDetails, resetPasswordSuccess } from "../../store/userSlice";
import publicCommunication from "../../service/publicCommunication";
import { setCookie } from "cookies-next";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleTogglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const updatePasswordSubmitHandler = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", {
        variant: "warning",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Doesn't Match", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);

    try {
      setLoader(true);
      const serverResponse = await publicCommunication.resetPassword(formData);
      if (serverResponse?.data?.success) {
        setCookie(
          process.env.REACT_APP_USERDETAILS,
          serverResponse?.data?.user ?? {}
        );
        dispatch(resetPasswordSuccess(serverResponse?.data?.user));
        dispatch(fetchUserDetails());
        enqueueSnackbar(
          serverResponse?.data?.message || "Password Updated Successfully",
          { variant: "success" }
        );

        navigate("/account");
      } else {
        enqueueSnackbar(
          serverResponse?.data?.message || "Something went wrong!",
          { variant: "warning" }
        );
      }
    } catch (error) {
      enqueueSnackbar(error?.message || "Something went wrong!", {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <MetaData title="Password Update | KanchanDeepJyot" />

      {loader && <BackdropLoader />}
      <main className="w-full mt-5 sm:pt-7 sm:mt-0 bg-primary-beige  pb-5 pattern-section">
        {/* <!-- row --> */}
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white  shadow-lg rounded-lg overflow-hidden">
          <FormSidebar
            title="Reset or update password!"
            tag="Enter your current and new password to update"
          />

          {/* <!-- signup column --> */}
          <div className="flex-1 overflow-hidden">
            <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">
              Reset Password
            </h2>
            {/* <!-- personal info procedure container --> */}
            <form
              onSubmit={updatePasswordSubmitHandler}
              className="p-5 sm:p-14"
            >
              <div className="flex flex-col gap-4 items-start">
                {/* <!-- input container column --> */}
                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showPassword.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handleTogglePasswordVisibility("oldPassword")
                            }
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword.oldPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handleTogglePasswordVisibility("newPassword")
                            }
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword.newPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handleTogglePasswordVisibility("confirmPassword")
                            }
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword.confirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                {/* <!-- input container column --> */}
                <button
                  type="submit"
                  disabled={loader}
                  className="text-white py-3 w-full bg-primary-blue shadow hover:shadow-lg rounded-sm font-medium"
                >
                  Update
                </button>
                <Link
                  className="hover:bg-gray-50 text-red-800 text-center py-3 w-full shadow border rounded-sm font-medium mb-8"
                  to="/account"
                >
                  Cancel
                </Link>
              </div>
            </form>
            {/* <!-- personal info procedure container --> */}
          </div>
          {/* <!-- signup column --> */}
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default UpdatePassword;
