import { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";
import publicCommunication from "../../service/publicCommunication";

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  // forgot password logic states
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Timer starts at 120 seconds / 2 min
  const [canResend, setCanResend] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleTogglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // functio to send otp on Email
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const serverResponse = await publicCommunication.sendOtpToMail(email);
      if (serverResponse?.data?.success) {
        enqueueSnackbar(
          serverResponse?.data?.message ||
            "OTP Send to your email successfully",
          {
            variant: "success",
          }
        );
        // remove below snackbar in the production
        enqueueSnackbar(serverResponse?.data?.otp, {
          variant: "success",
        });
        setIsOTPSent(true);
        setOtp("");
        setTimeLeft(120);
        setCanResend(false);
      } else {
        enqueueSnackbar(serverResponse?.data?.message, { variant: "warning" });
        setIsOTPSent(false);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      setIsOTPSent(false);
    } finally {
      setLoader(false);
    }
  };

  // function to verify entered otp
  const verifyOTP = async (e) => {
    e.preventDefault();

    if (otp?.length !== 4) {
      enqueueSnackbar("OTP length must be 4 digits long!", {
        variant: "warning",
      });
      return;
    }
    try {
      setLoader(true);
      const dataToSend = {
        email,
        otp,
      };
      const serverResponse = await publicCommunication.verifyOTP(dataToSend);
      if (serverResponse?.data?.success) {
        enqueueSnackbar(serverResponse?.data?.message, { variant: "success" });
        setIsOTPVerified(true);
      } else {
        enqueueSnackbar(serverResponse?.data?.message, { variant: "warning" });
        setIsOTPVerified(false);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      setIsOTPVerified(false);
    } finally {
      setLoader(false);
    }
  };

  // function to change password
  const changePassword = async (e) => {
    e.preventDefault();

    setLoader(true);
    try {
      const dataToSend = {
        email,
        newPassword,
      };
      const serverResponse = await publicCommunication.forgotPassword(
        dataToSend
      );
      if (serverResponse?.data?.success) {
        enqueueSnackbar(
          serverResponse?.data?.message || "Password updated successfully",
          { variant: "success" }
        );
        // reset all states after the password is changed
        setIsOTPSent(false);
        setIsOTPVerified(false);
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/login");
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

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear timer on component unmount
    } else {
      setCanResend(true); // Enable resend button when timer reaches 0
    }
  }, [timeLeft]);

  return (
    <>
      <MetaData title="Forgot Password | KanchanDeepJyot" />

      {loader && <BackdropLoader />}
      <main className="w-full mt-5 sm:pt-7 sm:mt-0 bg-primary-beige  pb-5 pattern-section">
        {/* <!-- row --> */}
        <div className="flex min-h-[50vh] sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white  shadow-lg rounded-lg overflow-hidden">
          <FormSidebar
            title="Forgot Your Password?"
            tag="Enter the email address associated with your account."
          />
          <div className="flex-1 overflow-hidden">
            <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">
              Forgot Password
            </h2>

            <div className="text-center py-10 px-4 sm:px-14">
              {/* <!-- Sent OTP Container --> */}
              {!isOTPSent && (
                <form onSubmit={sendOTP}>
                  <div className="flex flex-col w-full gap-4">
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                      <button
                        type="submit"
                        className="text-white py-3 w-full bg-primary-blue shadow rounded-sm font-medium"
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {/* <!-- Sent OTP Container --> */}

              {/* Verify OTP Container  */}
              {!isOTPVerified && isOTPSent && (
                <form onSubmit={verifyOTP}>
                  <div className="flex flex-col w-full gap-4">
                    {/* OTP Input  */}
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <div className={`pt-3`}>
                      {canResend ? (
                        <div
                          className="font-medium text-red-800 cursor-pointer"
                          onClick={sendOTP}
                        >
                          Resend
                        </div>
                      ) : (
                        <div className="font-medium text-primary-blue">
                          {timeLeft} sec
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                      <button
                        type="submit"
                        className="text-white py-3 w-full bg-primary-blue shadow rounded-sm font-medium"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {/* Verify OTP Container  */}
              {/* Forgot password Container  */}
              {isOTPSent && isOTPVerified && (
                <form onSubmit={changePassword}>
                  <div className="flex flex-col w-full gap-4">
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
                                handleTogglePasswordVisibility(
                                  "confirmPassword"
                                )
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
                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                      <button
                        type="submit"
                        className="text-white py-3 w-full bg-primary-blue shadow rounded-sm font-medium"
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="font-medium text-primary-blue">
                      <button
                        onClick={() => {
                          setIsOTPSent(false);
                          setIsOTPVerified(false);
                          setOtp("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                        className="cursor-pointer"
                      >
                        Back?
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {/* Forgot Password Container  */}

              <p className="text-xs text-primary-grey text-left py-2">
                By continuing, you agree to KanchanDeepJyot's{" "}
                <a
                  href="https://www.flipkart.com/pages/terms"
                  className="text-primary-blue"
                >
                  {" "}
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="/" className="text-primary-blue">
                  {" "}
                  Privacy Policy.
                </a>
              </p>
              <Link
                to="/register"
                className="font-medium text-sm text-red-800"
              >
                New to KanchanDeepJyot? Create an account
              </Link>
            </div>
          </div>
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default ForgotPassword;
