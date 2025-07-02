import { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { deleteOrder } from "../../actions/orderAction";
import Actions from "./Actions";
import { formatDate } from "../../utils/functions";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import { adminCommunication } from "../../service/adminCommunication";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Modal } from "@mui/material";
import OrderBilling from "./OrderBilling";

const OrderTable = () => {
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();
   const [order, setOrder] = useState([]);
   const [openModel, setOpenModel] = useState(false);
   const [billData, setBillData] = useState({});
   const [loading, setLoading] = useState(false);

   // const { orders, error } = useSelector((state) => state.allOrders);
   // const { loading, isDeleted, error: deleteError } = useSelector((state) => state?.order);

   useEffect(() => {
      const fetchOrders = async () => {
         setLoading(true)
         try {
            const response = await adminCommunication.getAllOrders();
            if (response?.data?.success) {
               setOrder(response?.data?.orders);
            } else {
               enqueueSnackbar("Failed to fetch categories.", {
                  variant: "error",
               });
            }
         } catch (error) {
            enqueueSnackbar("Error fetching categories: " + error.message, {
               variant: "error",
            });
         } finally {
            setLoading(false)
         }
      };
      fetchOrders();

      // if (error) {
      //     enqueueSnackbar(error, { variant: "error" });
      //     dispatch(clearErrors());
      // }
      // if (deleteError) {
      //     enqueueSnackbar(deleteError, { variant: "error" });
      //     dispatch(clearErrors());
      // }
      // if (isDeleted) {
      //     enqueueSnackbar("Deleted Successfully", { variant: "success" });
      //     dispatch({ type: DELETE_ORDER_RESET });
      // }
      // dispatch(getAllOrders());
   }, [enqueueSnackbar]);

   const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
   };

   const columns = [
      {
         field: "id",
         headerName: "Order ID",
         minWidth: 200,
         flex: 1,
      },
      {
         field: "status",
         headerName: "Status",
         minWidth: 150,
         flex: 0.2,
         renderCell: (params) => {
            return (
               <>
                  {params.row.status === "Delivered" ? (
                     <span className="text-sm bg-green-100 p-1 px-2 font-medium rounded-full text-green-800">
                        {params.row.status}
                     </span>
                  ) : params.row.status === "Shipped" ? (
                     <span className="text-sm bg-yellow-100 p-1 px-2 font-medium rounded-full text-yellow-800">
                        {params.row.status}
                     </span>
                  ) : (
                     <span className="text-sm bg-purple-100 p-1 px-2 font-medium rounded-full text-purple-800">
                        {params.row.status}
                     </span>
                  )}
               </>
            );
         },
      },
      {
         field: "itemsQty",
         headerName: "Items Qty",
         type: "number",
         minWidth: 100,
         flex: 0.1,
      },
      {
         field: "amount",
         headerName: "Amount",
         type: "number",
         minWidth: 200,
         flex: 0.2,
         renderCell: (params) => {
            return <span>₹{params.row.amount.toLocaleString()}</span>;
         },
      },
      {
         field: "orderOn",
         headerName: "Order On",
         type: "date",
         minWidth: 200,
         flex: 0.5,
      },
      {
         field: "actions",
         headerName: "Actions",
         minWidth: 280,
         flex: 0.3,
         type: "number",
         sortable: false,
         renderCell: (params) => {
            return (
               <div className="flex gap-4">
                  <Actions
                     editRoute={"order"}
                     deleteHandler={deleteOrderHandler}
                     id={params?.row?.id}
                  />
                  <button
                     type="submit"
                     className="bg-primary-blue p-2 text-white font-medium rounded shadow hover:shadow-lg"
                     onClick={() => {
                        setOpenModel(true);
                        setBillData(params?.row?.allOrderData);
                     }}
                  >
                     <DescriptionIcon /> Generate Invoice
                  </button>
               </div>
            );
         },
      },
   ];

   const rows = order.map((item) => ({
      id: item._id,
      itemsQty: item?.orderItems?.length,
      amount: item?.totalPrice,
      orderOn: formatDate(item?.createdAt),
      status: item?.orderStatus,
      allOrderData: item, // Store the object directly
   }));

   // orders && orders.forEach((order) => {
   //     rows.unshift({
   //         id: order._id,
   //         itemsQty: order.orderItems.length,
   //         amount: order.totalPrice,
   //         orderOn: formatDate(order.createdAt),
   //         status: order.orderStatus,
   //     });
   // });
  

   return (
      <>
         <MetaData title="Admin Orders | Flipkart" />

         {loading && <BackdropLoader />}

         <h1 className="text-lg font-medium uppercase">orders</h1>
         <div
            className="bg-white rounded-xl shadow-lg w-full"
            style={{ height: 470 }}
         >
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

         <Modal
            open={openModel}
            onClose={() => {
               setOpenModel(false);
               setBillData({});
            }}
            // aria-labelledby="modal-title"
            // aria-describedby="modal-description"
         >
           <OrderBilling billData={billData}/>
         </Modal>
      </>
   );
};

export default OrderTable;
