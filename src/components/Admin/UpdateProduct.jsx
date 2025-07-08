import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  REMOVE_PRODUCT_DETAILS,
  UPDATE_PRODUCT_RESET,
} from "../../constants/productConstants";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import ImageIcon from "@mui/icons-material/Image";
import BackdropLoader from "../Layouts/BackdropLoader";
import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import { adminCommunication } from "../../service/adminCommunication";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();

  let loading = false;
  let updateLoading = false;
  // const { loading, product, error } = useSelector((state) => state.productDetails);
  // const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.product);

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    title: "",
    description: "",
  });

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cuttedPrice, setCuttedPrice] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);
  // const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [sku, setSku] = useState(0);
  // const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  const handleSpecsChange = (e) => {
    setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!specsInput.title.trim() || !specsInput.title.trim()) return;
    setSpecs([...specs, specsInput]);
    setSpecsInput({ title: "", description: "" });
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((s, i) => i !== index));
  };

  const handleLogoChange = (e) => {
    const reader = new FileReader();

    setLogo("");
    setLogoPreview("");

    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
        // setLogo(reader.result);
      }
    };

    setLogo(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldData) => [...oldData, reader.result]);
        }
      };
      setImages(e.target.files);
      reader.readAsDataURL(file);
    });
  };

  const [disabled, setDisabled] = useState(false);

  const newProductSubmitHandler = async (e) => {
    setDisabled(true);
    e.preventDefault();

    // required field checks
    if (highlights.length <= 0) {
      enqueueSnackbar("Add Highlights", { variant: "warning" });
      setDisabled(false);
      return;
    }
    if (specs.length <= 1) {
      enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
      setDisabled(false);
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("shortName", shortName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("cuttedPrice", cuttedPrice);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("warranty", sku);
    formData.append("brandname", "KanchanDeepJyot");

    if (logo) {
      formData.append("thumbnail", logo);
    } else if (logoPreview) {
      formData.append("thumbnail", logoPreview);
    } else {
      enqueueSnackbar("Please attach thumbnail", { variant: "error" });
      setDisabled(false);
      return;
    }

    if (images.length > 0) {
      if (images.length < 2) {
        enqueueSnackbar("Please select atleast 2 product images", {
          variant: "error",
        });
        setDisabled(false);
        return;
      }
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    } else if (oldImages.length > 0) {
      let oldArr = [];
      for (let i = 0; i < oldImages.length; i++) {
        // formData.append("images", oldImages[i].url);
        oldArr.push(oldImages[i].url);
      }
      formData.append("images", JSON.stringify(oldArr));
    } else {
      enqueueSnackbar("Please select product images", { variant: "error" });
      setDisabled(false);
      return;
    }

    // highlights.forEach((h) => {
    formData.append("highlights", JSON.stringify(highlights));
    // });

    // specs.forEach((s) => {
    formData.append("specifications", JSON.stringify(specs));
    // });

    // return;
    try {
      const serverResponse = await adminCommunication.updateProduct(
        params.id,
        formData
      );
      if (serverResponse?.data?.success) {
        enqueueSnackbar("Category Updated Successfully", {
          variant: "success",
        });
        setDisabled(false);
        navigate("/admin/products");
      } else {
        enqueueSnackbar("Failed to update product", { variant: "error" });
        setDisabled(false);
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      setDisabled(false);
    }
  };

  const productId = params.id;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminCommunication.getAllCategory();
        if (response?.data?.success) {
          setCategoriesList(response?.data?.category);
        }
      } catch (error) {
        enqueueSnackbar("Error fetching categories: " + error.message, {
          variant: "error",
        });
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await adminCommunication.getProductById(productId);
        if (response?.data?.success) {
          const {
            name,
            shortName,
            description,
            price,
            cuttedPrice,
            stock,
            warranty,
            brand,
            highlights,
            specifications,
            images,
            category,
            subcategory,
          } = response?.data?.product;

          setName(name);
          setShortName(shortName);
          setDescription(description);
          setPrice(price);
          setCuttedPrice(cuttedPrice);
          setStock(stock);
          setSku(warranty);
          setHighlights(highlights || []);
          setSpecs(specifications || []);
          setOldImages(images || []);
          setCategory(category?._id || "");
          setSubCategory(subcategory?._id || "");
          setLogoPreview(brand?.logo?.url || "");
        }
      } catch (error) {
        enqueueSnackbar("Error fetching product: " + error.message, {
          variant: "error",
        });
      }
    };
    // fetchSubcategory();
    fetchCategories();
    fetchProductDetails();
  }, [productId, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Admin: Update Product | Flipkart" />

      {loading && <BackdropLoader />}
      {updateLoading && <BackdropLoader />}

      <form
        onSubmit={newProductSubmitHandler}
        encType="multipart/form-data"
        className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
        id="mainform"
      >
        <Link
          to="/admin/products"
          className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"
        >
          <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
          Go Back
        </Link>
        <div className="flex flex-col gap-3 m-2 sm:w-1/2">
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Short Name"
            variant="outlined"
            size="small"
            required
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            required
            variant="outlined"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between">
            <TextField
              label="New Price"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="Old Price"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={cuttedPrice}
              onChange={(e) => setCuttedPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-4">
            <TextField
              label="Category"
              select
              fullWidth
              variant="outlined"
              size="small"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoriesList?.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            {/* <TextField
              label="Sub-Category"
              select
              fullWidth
              variant="outlined"
              size="small"
              required
              value={subcategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              {subCategoriesList?.map((subCategory) => (
                <MenuItem key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </MenuItem>
              ))}
            </TextField> */}
          </div>
          <div className="flex justify-between gap-4">
            <TextField
              label="Stock"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              label="SKU"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center border rounded">
              <input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                type="text"
                placeholder="Highlight"
                className="px-2 flex-1 outline-none border-none"
              />
              <span
                onClick={() => addHighlight()}
                className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer"
              >
                Add
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {highlights.map((h, i) => (
                <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                  <p className="text-green-800 text-sm font-medium">{h}</p>
                  <span
                    onClick={() => deleteHighlight(i)}
                    className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                  >
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 m-2 sm:w-1/2">
          <h2 className="font-medium">Thumbnail Image</h2>
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
            <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
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
            <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
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
          <h2 className="font-medium">Specifications</h2>

          <div className="flex justify-evenly gap-2 items-center">
            <TextField
              value={specsInput.title}
              onChange={handleSpecsChange}
              name="title"
              label="Name"
              placeholder="Model No"
              variant="outlined"
              size="small"
            />
            <TextField
              value={specsInput.description}
              onChange={handleSpecsChange}
              name="description"
              label="Description"
              placeholder="WJDK42DF5"
              variant="outlined"
              size="small"
            />
            <span
              onClick={() => addSpecs()}
              className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer"
            >
              Add
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {specs.map((spec, i) => (
              <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                <p className="text-gray-500 font-medium">{spec.title}</p>
                <p>{spec.description}</p>
                <span
                  onClick={() => deleteSpec(i)}
                  className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                >
                  <DeleteIcon />
                </span>
              </div>
            ))}
          </div>

          <h2 className="font-medium">Product Images</h2>
          <div className="flex gap-2 overflow-x-auto h-32 border rounded">
            {oldImages &&
              oldImages.map((image, i) => (
                <img
                  draggable="false"
                  src={image.url}
                  alt="Product"
                  key={i}
                  className="w-full h-full object-contain"
                />
              ))}
            {imagesPreview.map((image, i) => (
              <img
                draggable="false"
                src={image}
                alt="Product"
                key={i}
                className="w-full h-full object-contain"
              />
            ))}
          </div>
          <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleProductImageChange}
              className="hidden"
            />
            Choose Files
          </label>

          <div className="flex justify-end">
            <button
              disabled={disabled}
              form="mainform"
              type="submit"
              className="mx-auto bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
              value="Update"
            >
              {disabled ? "Please Wait..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProduct;
