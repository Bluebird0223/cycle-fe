import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
// import { createProduct, clearErrors } from '../../actions/productAction';
import ImageIcon from "@mui/icons-material/Image";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
// import { createProduct } from '../../service/adminCommunication/createProduct';
import { adminCommunication } from "../../service/adminCommunication";
import { RiseLoader } from "react-spinners";

const AddCategory = () => {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // const { loading, success, error } = useSelector((state) => state.newProduct);
  let loading = false,
    success,
    error;

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);  // For image preview
      }
    };

    reader.readAsDataURL(file); // Only for previewing

    // For uploading (important!)
    setLogo(file);  // This must be the actual File object
  };
  const newCategorySubmitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    if (!logo) {
      enqueueSnackbar("Add Category image", { variant: "warning" });
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", logo);
    try {
      // setLoading(true);
      const serverResponse = await adminCommunication.createCategory(formData);
      if (serverResponse) {
        enqueueSnackbar("Category Created Successfully", {
          variant: "success",
        });
        setDisabled(false);
        navigate("/admin/category");
      } else {
        setDisabled(false);
        enqueueSnackbar("Failed to create category", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar(`Error: ${err.message}`, { variant: "error" });
    }
  };

  // useEffect(() => {
  //     if (error) {
  //         enqueueSnackbar(error, { variant: "error" });
  //         // dispatch(clearErrors());
  //     }
  //     if (success) {
  //         enqueueSnackbar("Product Created", { variant: "success" });
  //         dispatch({ type: NEW_PRODUCT_RESET });
  //         navigate("/admin/category");
  //     }
  // }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Admin: New Category | KanchanDeepJyot" />

      {loading && <BackdropLoader />}
      <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">
          Category
        </h2>

        <form onSubmit={newCategorySubmitHandler} className="p-5 sm:p-10">
          <div className="flex flex-col gap-3 items-start">
            <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
              <h2 className="font-medium">Category Name</h2>
              <TextField
                label="Category Name"
                variant="outlined"
                size="small"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <h2 className="font-medium">Category Image</h2>
              <p className="text-red-600 text-sm">
                Image size must be under 500 KB*
              </p>
              <div className="flex justify-between gap-4 items-start">
                {/* <TextField
                            label="Brand"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        /> */}
                <div className="w-24 h-25 flex items-center justify-center border rounded-lg p-1">
                  {!logoPreview ? (
                    <ImageIcon />
                  ) : (
                    <img
                      draggable="false"
                      src={logoPreview}
                      alt="Brand Logo"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <label className="rounded bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  Choose Image
                </label>
              </div>
              {disabled ? (
                <button
                  disabled={disabled}
                  className="text-white py-3 w-full text-center bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                >
                  <RiseLoader color="#ffffff" margin={2} size={5} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                >
                  Submit
                </button>
              )}
              <Link
                className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                to="/admin/category"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
