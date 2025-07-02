import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
// import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import Actions from './Actions';

const Coupon = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true);
            try {
                const response = await adminCommunication.getAllCoupons();
                if (response?.data?.success) {
                    setCoupons(response?.data?.coupons);
                } else {
                    enqueueSnackbar("Failed to fetch coupon.", { variant: "error" });
                }
            } catch (err) {
                enqueueSnackbar("Error fetching coupon: " + err.message, { variant: "error" });
            } finally {
                setLoading(false)
            }
        };

        fetchCoupons();
    }, [enqueueSnackbar]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await adminCommunication.updateCouponStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`Coupon status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setCoupons((prevCoupons) =>
                    prevCoupons.map((coupon) =>
                        coupon._id === id ? { ...coupon, isActive: newStatus } : coupon
                    )
                );
            } else {
                enqueueSnackbar("Failed to update coupon status.", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Error updating coupon status: " + err.message, { variant: "error" });
        }
    };


    const deleteCouponsHandler = async (id) => {
        console.log('here', id)
        // try {
        //     const response = await adminCommunication.deleteCategory(id);
        //     if (response?.data?.success) {
        //         enqueueSnackbar('category deleted', { variant: "success" });
        //     } else {
        //         enqueueSnackbar("Failed to delete.", { variant: "error" });
        //     }
        // } catch (error) {
        //     enqueueSnackbar("Error updating subcategory status: " + error.message, { variant: "error" });
        // }
        // dispatch(deleteProduct(id));
        // if (window.confirm('Are you sure you want to delete this category?')) {
        //     enqueueSnackbar("Category Deleted", { variant: "success" });
        // }
    };


    const columns = [
        {
            field: "title",
            headerName: "Title",
            minWidth: 150,
            flex: 0.2,
        },
        {
            field: "code",
            headerName: "Code",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "value",
            headerName: "Value/Price",
            minWidth: 100,
            flex: 0.1,
            renderCell: (params) => {
                if (params.row.type === 'percentage') {
                    return `${params.row.value}%`;
                } else if (params.row.type === 'price') {
                    return `${params.row.value}-price`;
                }
                return params.row.value;
            },
        },
        {
            field: "validity",
            headerName: "Validity",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                const { from, till } = params.row.validity;
                return `${new Date(from).toLocaleDateString()} - ${new Date(till).toLocaleDateString()}`;
            },
        },
        {
            field: "isActive",
            headerName: "Status",
            minWidth: 100,
            flex: 0.1,
            align: "center",
            headerAlign: "center",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Switch
                        checked={params.row.isActive}
                        onChange={(e) => handleStatusChange(params.row.id, e.target.checked)}
                        inputProps={{ 'aria-label': 'Status Toggle' }}
                    />
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions
                        editRoute={"coupons"}
                        deleteHandler={deleteCouponsHandler}
                        id={params.row.id}
                    />
                );
            },
        },
    ];

    const rows = coupons.map((coupon) => ({
        id: coupon._id,
        title: coupon.title,
        code: coupon.code,
        value: coupon.value,
        type: coupon.type,
        validity: coupon.validity,
        isActive: coupon.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Coupon | KanchanDeepJyot" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Coupons</h1>
                <Link to="/admin/new_coupon" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">
                    New Coupon
                </Link>
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

export default Coupon;

