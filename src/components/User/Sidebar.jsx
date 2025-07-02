import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FolderIcon from "@mui/icons-material/Folder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import ChatIcon from "@mui/icons-material/Chat";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// import { logoutUser } from "../../actions/userAction";
import blankImg from "../../assets/images/Products/selling_prod5.png";
import { logoutFail, logoutSuccess } from "../../store/userSlice";
import { deleteCookie } from "cookies-next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import publicCommunication from "../../service/publicCommunication";
import { emptyCart } from "../../store/cartSlice";
import { emptyWishlist } from "../../store/wishlistSlice";

const Sidebar = ({ activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.user);
  // reviews
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = async () => {
    if (rating === 0 || !message.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" });
      return;
    }
    if (message.trim()?.length < 10) {
      enqueueSnackbar("Message must be at least 10 characters long", {
        variant: "error",
      });
      return;
    }
    // New/Update Review
    try {
      const serverResponse = await publicCommunication.submitFeedback(
        rating,
        message
      );
      if (serverResponse?.data?.success) {
        enqueueSnackbar("Thanks For Feedback", { variant: "success" });
        setRating(0);
        setMessage("");
      } else {
        enqueueSnackbar(
          serverResponse?.data?.message || "Something went wrong",
          { variant: "error" }
        );
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
    }
    setOpen(false);
  };

  // Logout User
  const handleLogout = () => {
    try {
      dispatch(logoutSuccess());
      dispatch(emptyCart())
      dispatch(emptyWishlist())
      deleteCookie(process.env.REACT_APP_TOKENNAME);
      deleteCookie(process.env.REACT_APP_USERDETAILS);
      enqueueSnackbar("Logout Successfully", { variant: "success" });
      navigate("/login");
    } catch (error) {
      dispatch(logoutFail(error.response.data.message));
    }
  };

  return (
    <div className="hidden sm:flex flex-col gap-4 w-1/4 px-1">
      {/* <!-- profile card --> */}
      <div className="flex items-center gap-4 p-3 bg-white rounded-sm shadow">
        {/* <!-- user icon --> */}
        <div className="w-12 h-12 rounded-full">
          <img
            draggable="false"
            className="h-full w-full object-cover rounded-full"
            src={user?.avatar?.url ?? blankImg}
            alt="Avatar"
          />
        </div>
        {/* <!-- user icon --> */}
        <div className="flex flex-col gap-1">
          <p className="text-xs">Hello,</p>
          <h2 className="font-medium capitalize">
            {user?.name ?? "user"}
          </h2>
        </div>
      </div>
      {/* <!-- profile card --> */}

      {/* <!-- nav tiles --> */}
      <div className="flex flex-col bg-white rounded-sm shadow">
        {/* <!-- my orders tab --> */}
        <div className="flex items-center gap-5 px-4 py-4 border-b">
          <span className="text-primary-blue">
            <FolderIcon />
          </span>
          <Link
            className="flex w-full justify-between font-medium text-gray-500  hover:text-primary-blue"
            to="/orders"
          >
            MY ORDERS
            <span>
              <ChevronRightIcon />
            </span>
          </Link>
        </div>
        {/* <!-- my orders tab --> */}

        {/* <!-- account settings tab --> */}
        <div className="flex items-center gap-5 px-4 py-4">
          <span className="text-primary-blue">
            <PersonIcon />
          </span>
          <p className="flex w-full justify-between font-medium text-gray-500">
            ACCOUNT SETTINGS
          </p>
        </div>
        <div className="flex flex-col pb-3 border-b   text-sm">
          <Link
            to="/account"
            className={`${
              activeTab === "profile"
                ? "bg-blue-50  text-primary-blue font-medium"
                : "hover:bg-blue-50 hover:text-primary-blue"
            } p-3 pl-14`}
          >
            Profile Information
          </Link>
          {/* <Link
            className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue"
            to="/"
          >
            Manage Addresses
          </Link> */}
        </div>
        {/* <!-- account settings tab --> */}

        {/* <!-- payments tab --> */}
        {/* <div className="flex items-center gap-5 px-4 py-4">
          <span className="text-primary-blue">
            <AccountBalanceWalletIcon />
          </span>
          <p className="flex w-full justify-between font-medium text-gray-500">
            PAYMENTS
          </p>
        </div> */}
        {/* <div className="flex flex-col pb-3 border-b text-sm">
          <Link
            className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue flex justify-between pr-6"
            to="/"
          >
            Gift Cards{" "}
            <span className="font-medium text-primary-green">₹0</span>
          </Link>
          <Link
            className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue"
            to="/"
          >
            Saved UPI
          </Link>
          <Link
            className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue"
            to="/"
          >
            Saved Cards
          </Link>
        </div> */}
        {/* <!-- payments tab --> */}

        {/* <!-- my chats tab --> */}
        {/* <div className="flex items-center gap-5 px-4 py-4 border-b">
          <span className="text-primary-blue">
            <ChatIcon />
          </span>
          <Link
            className="flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue"
            to="/"
          >
            MY CHATS
            <span>
              <ChevronRightIcon />
            </span>
          </Link>
        </div> */}
        {/* <!-- my chats tab --> */}

        {/* <!-- my stuff tab --> */}
        <div className="flex items-center gap-5 px-4 py-4">
          <span className="text-primary-blue">
            <FolderSharedIcon />
          </span>
          <p className="flex w-full justify-between font-medium text-gray-500">
            MY STUFF
          </p>
        </div>
        <div className="flex flex-col pb-3 border-b  text-sm">
          <Link
            className="p-3 pl-14 hover:bg-blue-50 
             "
            to="/not-found"
          >
            My Coupons
          </Link>
          {/* <Link
            className="p-3 pl-14 hover:bg-blue-50 hover:text-primary-blue"
            to="/"
          >
            My Reviews & Ratings
          </Link> */}
          <Link
            className="p-3 pl-14 hover:bg-blue-50 "
            to="/"
          >
            All Notifications
          </Link>
          <Link
            to="/wishlist"
            className={`${
              activeTab === "wishlist"
                ? "bg-blue-50 text-primary-blue font-medium"
                : "hover:bg-blue-50"
            } p-3 pl-14`}
          >
            My Wishlist
          </Link>
        </div>
        {/* <!-- my stuff tab --> */}
        {/* <!-- Feedback tab --> */}
        <div className="flex items-center gap-5 px-4 py-4 border-b">
          <span className="text-primary-blue">
            <ReviewsIcon />
          </span>
          <div
            className="flex w-full justify-between font-medium text-gray-500 cursor-pointer"
            onClick={handleDialogClose}
          >
            Feedback
            <span>
              <ChevronRightIcon />
            </span>
          </div>
        </div>
        <Dialog
          aria-labelledby="review-dialog"
          open={open}
          onClose={handleDialogClose}
        >
          <DialogTitle className="border-b border-gray-300 ">
            Submit Feedback
          </DialogTitle>
          <DialogContent className="flex flex-col p-1 gap-4 ">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
              precision={0.5}
            />
            <TextField
              label="Message"
              multiline
              rows={3}
              sx={{ width: 400 }}
              size="small"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleDialogClose}
              className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
            >
              Cancel
            </button>
            <button
              onClick={reviewSubmitHandler}
              className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
            >
              Submit
            </button>
          </DialogActions>
        </Dialog>
        {/* <!-- Feedback tab --> */}
        {/* <!-- logout tab --> */}
        <div className="flex items-center gap-5 px-4 py-4 border-b">
          <span className="text-primary-blue">
            <PowerSettingsNewIcon />
          </span>
          <div
            className="flex w-full justify-between font-medium text-gray-500  cursor-pointer"
            onClick={handleLogout}
          >
            Logout
            <span>
              <ChevronRightIcon />
            </span>
          </div>
        </div>
        {/* <!-- logout tab --> */}
      </div>
      {/* <!-- nav tiles --> */}

      {/* <!-- frequenty visited tab --> */}
      <div className="flex flex-col items-start gap-2 p-4 bg-white rounded-sm shadow">
        <span className="text-xs font-medium ">
          Frequently Visited:
        </span>
        <div className="flex gap-2.5 text-xs text-gray-500">
          <Link to="/password/update" className="hover:text-red-800">
            Reset Password
          </Link>
          <Link to="/orders" className="hover:text-red-800">
            Track Order
          </Link>
          <Link to="/" className="hover:text-red-800">
            Help Center
          </Link>
        </div>
      </div>
      {/* <!-- frequenty visited tab --> */}
    </div>
  );
};

export default Sidebar;
