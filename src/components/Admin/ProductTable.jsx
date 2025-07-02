import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Rating from '@mui/material/Rating';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';

const ProductTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await adminCommunication.getAdminProducts();
                if (response?.data?.success) {
                    setProducts(response?.data?.products);
                } else {
                    enqueueSnackbar("Failed to fetch products.", { variant: "error" });
                }
            } catch (error) {
                enqueueSnackbar("Error fetching products: " + error.message, { variant: "error" });
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [enqueueSnackbar]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    const columns = [
        {
            field: "sku",
            headerName: "Product SKU",
            minWidth: 100,
            width:100,
            maxWidth:100,
            flex: 1,
        },
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            width:200,
            maxWidth:200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {params.row.name}
                    </div>
                )
            },
        },
        // {
        //     field: "category",
        //     headerName: "Category",
        //     minWidth: 100,
        //     flex: 0.1,
        // },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.stock < 10 ? (
                                <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">{params.row.stock}</span>
                            ) : (
                                <span className="">{params.row.stock}</span>
                            )
                        }
                    </>
                )
            },
        },
        {
            field: "price",
            headerName: "New Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>₹{params.row.price.toLocaleString()}</span>
                );
            },
        },
        {
            field: "cprice",
            headerName: "Old Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span>₹{params.row.cprice.toLocaleString()}</span>
                );
            },
        },
        // {
        //     field: "rating",
        //     headerName: "Rating",
        //     type: "number",
        //     minWidth: 100,
        //     flex: 0.1,
        //     align: "left",
        //     headerAlign: "left",
        //     renderCell: (params) => {
        //         return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
        //     }
        // },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"product"} deleteHandler={deleteProductHandler} id={params.row.id} />
                );
            },
        },
    ];

    const rows = products.map((item) => ({
        sku: item.sku,
        id:item._id,
        name: item.name,
        image: item.images[0]?.url,
        category: item.category?.name,
        stock: item.stock,
        price: item.price,
        cprice: item.cuttedPrice,
        // rating: item.ratings,
    }));


    return (
        <>
            <MetaData title="Admin Products | KanchanDeepJyot" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">products</h1>
                <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Product</Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default ProductTable;