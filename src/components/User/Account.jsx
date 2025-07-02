import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import Avatar from "@mui/material/Avatar";
import { useSnackbar } from "notistack";
import blankImg from "../../assets/images/Products/Chandan.webp";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { setCookie } from "cookies-next";
import publicCommunication from "../../service/publicCommunication";
import {
  profileUpdateRequest,
  profileUpdateSuccess,
} from "../../store/userSlice";
import BackdropLoader from "../Layouts/BackdropLoader";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);

  const [isEditable, setIsEditable] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url ?? blankImg
  );
  const [avatar, setAvatar] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    mobile: user?.mobile || "",
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Sync userDetails with Redux state when user changes
  useEffect(() => {
    setUserDetails({
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      mobile: user?.mobile || "",
    });
    setAvatarPreview(user?.avatar?.url ?? blankImg);
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", userDetails.name);
      formData.append("mobile", userDetails.mobile);
      formData.append("email", userDetails.email);
      formData.append("gender", userDetails.gender);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      const serverResponse = await publicCommunication?.updateUserProfile(
        formData
      );
      if (serverResponse?.data?.success === true) {
        setCookie(
          process.env.REACT_APP_USERDETAILS,
          serverResponse?.data?.user ?? {}
        );
        dispatch(profileUpdateSuccess(serverResponse?.data?.user));
        enqueueSnackbar("Profile Update Successfully", { variant: "success" });
        setIsEditable(false);
      } else {
        enqueueSnackbar(
          serverResponse?.data?.message || "Something went wrong!",
          { variant: "warning" }
        );
      }
    } catch (error) {
      enqueueSnackbar(error?.message ?? "Profile update Failed!", {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const handleDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <MetaData title="My Profile | KanchanDeepJyot.com" />

      {loader && <BackdropLoader />}
      <main className="w-full pt-3">
        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto pb-7">
          <Sidebar activeTab={"profile"} />

          <div className="flex-1 overflow-hidden shadow bg-white">
            <form
              className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6"
              onSubmit={handleProfileUpdate}
            >
              <div className="w-1/2 flex flex-col gap-5 items-start">
                <span className="font-medium text-lg">
                  Personal Information &nbsp;
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditable(!isEditable);
                    }}
                    className="text-sm text-red-800 font-medium ml-8 cursor-pointer"
                  >
                    {isEditable ? "Cancel" : "Edit"}
                  </button>
                </span>

                <TextField
                  fullWidth
                  id="full-name"
                  label="Full Name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleDataChange}
                  required
                  disabled={!isEditable}
                  InputProps={{
                    classes: {
                      root: "",
                      disabled: "cursor-not-allowed",
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: "",
                    },
                  }}
                />

                <div className="w-1/2 flex flex-col gap-2">
                  <h2 className="text-sm">Your Gender</h2>
                  <div className="flex items-center gap-8" id="radioInput">
                    <RadioGroup
                      row
                      aria-labelledby="radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        name="gender"
                        value="male"
                        onChange={handleDataChange}
                        control={<Radio required />}
                        label="Male"
                        checked={userDetails.gender === "male"}
                        disabled={!isEditable}
                      />

                      <FormControlLabel
                        name="gender"
                        value="female"
                        onChange={handleDataChange}
                        control={<Radio required />}
                        label="Female"
                        checked={userDetails.gender === "female"}
                        disabled={!isEditable}
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="w-1/2 flex flex-col gap-5 items-start">
                <span className="font-medium text-lg">Email Address</span>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleDataChange}
                  required
                  disabled={!isEditable}
                  InputProps={{
                    classes: {
                      root: "",
                      disabled: "cursor-not-allowed",
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: "",
                    },
                  }}
                />
              </div>

              <div className="w-1/2 flex flex-col gap-5 items-start">
                <span className="font-medium text-lg">Mobile Number</span>
                <TextField
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  type="number"
                  name="mobile"
                  value={userDetails.mobile}
                  onChange={handleDataChange}
                  required
                  placeholder="+91 **********"
                  disabled={!isEditable}
                  InputProps={{
                    classes: {
                      root: "",
                      disabled: "cursor-not-allowed",
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: "",
                    },
                  }}
                />
              </div>

              <div className="w-1/2 flex flex-col justify-between sm:flex-row gap-3 items-center">
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
                    onChange={handleDataChange}
                    className="hidden"
                    disabled={!isEditable}
                  />
                  Choose File
                </label>
              </div>

              {isEditable && (
                <div>
                  <button
                    disabled={loader}
                    type="submit"
                    className="bg-primary-blue text-white text-base p-2 rounded-sm cursor-pointer"
                  >
                    Update Profile
                  </button>
                </div>
              )}
            </form>
            <img
              draggable="false"
              className="w-full object-contain"
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
              alt="footer"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
