import React, { useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { adminCommunication } from "../../service/adminCommunication";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function ProductsGroups() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    const resp = await adminCommunication.getAllGroups();
    if (resp?.data?.success) {
      setGroups(resp?.data?.groups);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        const success = await adminCommunication.deleteGroup(id);
  
        if (success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchGroups();
          // Optionally, update your UI or data here
        } else {
          Swal.fire({
            title: "Error!",
            text: "Error while deleting",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error during delete:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <>
      <MetaData title="Admin Categories | KanchanDeepJyot" />
      <div className="h-full">
        <div className="flex justify-between items-center">
          <h2 className="uppercase text-xl font-medium">Product Groups</h2>
          <Link
            to={"/admin/new-product-group"}
            className="bg-red-800 text-white rounded px-4 py-2 text-base font-medium"
          >
            Create
          </Link>
        </div>
        <div className="rounded shadow my-2 p-2 h-[95%] overflow-scroll bg-white">
          <div>
            {groups?.map((g, i) => (
              <div key={i}>
                <Accordion slotProps={{ heading: { component: "h4" } }}>
                  <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className="border border-red-950"
                  >
                    <div className="flex w-full justify-between gap-5">
                      <h1 className="font-medium text-base text-red-900">
                        {g?.name}
                      </h1>
                      <div>
                        <button
                          onClick={() =>
                            navigate("/admin/update-product-group/" + g?._id)
                          }
                        >
                          <EditIcon className="text-blue-900" />
                        </button>
                        <button onClick={() => handleDelete(g?._id)}>
                          <DeleteIcon className="text-red-900" />
                        </button>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="grid grid-cols-8 gap-2">
                      {g?.products?.map((p, i) => (
                        <div key={i} className="border p-2 ">
                          <div className="w-full h-28 overflow-hidden">
                            <img src={p?.brand?.logo?.url} alt="kanchandeep" />
                          </div>
                          <h1 className="text-sm">{p?.name}</h1>
                          <h2 className="text-sm font-semibold">
                            {p?.shortName}
                          </h2>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
