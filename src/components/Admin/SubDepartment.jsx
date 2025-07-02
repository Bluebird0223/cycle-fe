import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { adminCommunication } from '../../service/adminCommunication';
import defaultImage from '../../assets/images/blank_img.jpeg';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../actions/productAction';
import Switch from '@mui/material/Switch';
import Actions from './Actions';

const SubDepartment = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [subDepartment, setSubDepartment] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubCategories = async () => {
            setLoading(true);
            try {
                const response = await adminCommunication.getAllSubDepartment();
                if (response?.data?.success) {
                    setSubDepartment(response?.data?.subDepartments);
                } else {
                    enqueueSnackbar("Failed to fetch sub categories.", { variant: "error" });
                }
            } catch (err) {
                enqueueSnackbar("Error fetching sub categories: " + err.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchSubCategories();
    }, [enqueueSnackbar]);



    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await adminCommunication.updateSubDepartmentStatus(id);
            if (response?.data?.success) {
                enqueueSnackbar(`Subcategory status updated to ${newStatus ? 'Active' : 'Inactive'}`, { variant: "success" });
                setSubDepartment((prevSubCategories) =>
                    prevSubCategories.map((subcategory) =>
                        subcategory._id === id ? { ...subcategory, isActive: newStatus } : subcategory
                    )
                );
            } else {
                enqueueSnackbar("Failed to update subcategory status.", { variant: "error" });
            }
        } catch (err) {
            enqueueSnackbar("Error updating subcategory status: " + err.message, { variant: "error" });
        }
    };


    const deleteSubDepartmentHandler = (id) => {
        console.log("here", id)


        // dispatch(deleteProduct(id));
        // if (window.confirm('Are you sure you want to delete this category?')) {
        //     enqueueSnackbar("Category Deleted", { variant: "success" });
        // }
    };


    const columns = [
        {
            field: "departmentId",
            headerName: "Department ID",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "department",
            headerName: "Sub Department Name",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "subdepartment",
            headerName: "Department Name",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 1,
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
            flex: 1,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => (
                <div>
                     <Actions editRoute={"subdepartment"} deleteHandler={deleteSubDepartmentHandler} id={params.row.id} />
                </div>
            ),
        },
    ];


    const rows = subDepartment.map((item) => ({
        id: item._id,
        departmentId: item._id,
        department: item.name || 'Unnamed Department',
        subdepartment: item.department?.name || 'Unnamed Department',
        isActive: item.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Subcategories | KanchanDeepJyot" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Sub Department</h1>
                <Link to="/admin/new_subdepartment" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">
                    New Subdepartment
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

export default SubDepartment;

