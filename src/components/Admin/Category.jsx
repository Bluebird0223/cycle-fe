"use client"

import { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { useSnackbar } from "notistack"
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { Switch, Button, IconButton } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { adminCommunication } from "../../service/adminCommunication"
import Actions from "./Actions"
import { deleteCategory } from "../../actions/categoryAction";


const Category = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const response = await adminCommunication.getAllCategory()
        if (response?.data?.success) {
          setCategories(response?.data?.category)
        } else {
          enqueueSnackbar("Failed to fetch categories.", { variant: "error" })
        }
      } catch (err) {
        enqueueSnackbar("Error fetching categories: " + err.message, { variant: "error" })
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [enqueueSnackbar])

  const handleStatusChange = async (categoryId, newStatus) => {
    try {
      // Find the actual category to get the correct _id
      const category = categories.find((cat) => cat._id === categoryId)
      if (!category) {
        enqueueSnackbar("Category not found.", { variant: "error" })
        return
      }

      const response = await adminCommunication.updateCategoryStatus(category._id)
      if (response?.data?.success) {
        enqueueSnackbar(`Category status updated to ${newStatus ? "Active" : "Inactive"}`, { variant: "success" })
        setCategories((prevCategories) =>
          prevCategories.map((cat) => (cat._id === categoryId ? { ...cat, isActive: newStatus } : cat)),
        )
      } else {
        enqueueSnackbar("Failed to update category status.", { variant: "error" })
      }
    } catch (err) {
      enqueueSnackbar("Error updating category status: " + err.message, { variant: "error" })
    }
  }

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  }

  // const deleteCategoryHandler = async (categoryId) => {

  //   setDeleteLoading(true)
  //   try {
  //     // Find the actual category to get the correct _id
  //     const category = categories.find((cat) => cat._id === categoryId)
  //     if (!category) {
  //       enqueueSnackbar("Category not found.", { variant: "error" })
  //       setDeleteLoading(false)
  //       return
  //     }

  //     console.log("Deleting category with ID:", category._id)
  //     const response = await adminCommunication.deleteCategory(category._id)
  //     console.log("Delete response:", response)

  //     if (response?.data?.success) {
  //       enqueueSnackbar("Category deleted successfully", { variant: "success" })
  //       // Update the categories list by removing the deleted category
  //       setCategories((prevCategories) => prevCategories.filter((cat) => cat._id !== categoryId))
  //     } else {
  //       const errorMessage = response?.data?.message || "Failed to delete category. Please try again."
  //       console.error("Delete failed:", errorMessage)
  //       enqueueSnackbar(errorMessage, { variant: "error" })
  //     }
  //   } catch (error) {
  //     console.error("Delete category error:", error)
  //     const errorMessage =
  //       error?.response?.data?.message || error?.message || "Error deleting category. Please try again."
  //     enqueueSnackbar(errorMessage, { variant: "error" })
  //   } finally {
  //     setDeleteLoading(false)

  //   }
  // }

  const columns = [
    {
      field: "categoryimage",
      headerName: "Category Image",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full">
          <img
            src={params.row.categoryimage || "/placeholder.svg"}
            alt={params.row.category}
            className="w-16 h-16 object-cover rounded"
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=64&width=64"
            }}
          />
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category Name",
      minWidth: 150,
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
            inputProps={{ "aria-label": "Status Toggle" }}
            disabled={deleteLoading}
          />
        )
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          // <div className="flex gap-2">
          //   <IconButton
          //     component={Link}
          //     to={`/admin/category/${params.row.id}`}
          //     size="small"
          //     color="primary"
          //     title="Edit Category"
          //   >
          //     <Edit />
          //   </IconButton>
          //   <IconButton
          //     onClick={() => deleteCategoryHandler(params.row.id)}
          //     size="small"
          //     color="error"
          //     disabled={deleteLoading}
          //     title="Delete Category"
          //   >
          //     <Delete />
          //   </IconButton>
          // </div>
          <Actions editRoute={"category"} deleteHandler={deleteCategoryHandler} id={params.row.id} name={params.row.name} />
        )
      },
    },
  ]

  const rows = categories.map((item) => ({
    id: item._id, // Use _id as the primary identifier
    categoryimage: item.image?.[0]?.url || "/placeholder.svg?height=100&width=100",
    category: item.name || "Unnamed Category",
    isActive: item.isActive ?? false,
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading categories...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Button
          component={Link}
          to="/admin/new_category"
          variant="contained"
          color="primary"
          className="bg-blue-600 hover:bg-blue-700"
        >
          New Category
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg" style={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={deleteLoading}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8f9fa",
              borderBottom: "2px solid #e9ecef",
            },
          }}
        />
      </div>
    </div>
  )
}

export default Category
