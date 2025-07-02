import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { adminCommunication } from "../../service/adminCommunication";
import GroupCard from "./ProductGroup/GroupCard";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();

export default function NewProductGroup() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [products, setProducts] = useState([
    { value: "1", label: "value 1" },
    { value: "2", label: "value 2" },
    { value: "3", label: "value 3" },
    { value: "4", label: "value 4" },
    { value: "5", label: "value 5" },
  ]);
  const [groupName, setGroupName] = useState("");

  const handleChange = (newValue, actionMeta) => {
    setSelectedOptions(newValue);
    console.log(`action: ${actionMeta.action}`, newValue);
  };

  const initializeProducts = async () => {
    const { data } = await adminCommunication.getAdminProducts();

    if (data?.success) {
      console.log(typeof data?.products);
      // if(typeof data?.products ==="" )
      let temp = [];
      data?.products.forEach((p) => {
        temp.push({
          value: JSON.stringify(p),
          label: `${p.name} | Price:${p.price} | Cutted Price:${p.cuttedPrice}`,
        });
      });
      setProducts(temp);
    }
  };

  useEffect(() => {
    initializeProducts();
  }, []);

  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    if (selectedOptions.length <= 0) {
      enqueueSnackbar("Please select products", { variant: "error" });
      return;
    }
    if (!groupName) {
        enqueueSnackbar("Enter group name", { variant: "error" });
        return;
    }
    let products = [];
    selectedOptions.forEach((s) => {
        products.push(JSON.parse(s.value)._id);
    });
    
    setDisabled(true)
    const body = { name: groupName, products: products };
    const {data} = await adminCommunication.createGroup(body);
    if(data.success){
        setDisabled(false)
        enqueueSnackbar("Group created", { variant: "success" });
        navigate("/admin/product-groups")
    }else{
        setDisabled(false)
        enqueueSnackbar(data?.message, { variant: "error" });
    }
  };

  return (
    <div className="h-full">
      <h2 className="uppercase text-xl font-medium">Create Group</h2>
      <div className="bg-white p-2 rounded h-[90%] mt-5">
        <div className="flex gap-2">
          <TextField
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full"
            id="outlined-basic"
            label="Enter group name"
            variant="outlined"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500 px-4 rounded text-lg font-medium text-white"
          >
            Create
          </button>
        </div>
        <div className="grid grid-cols-5 h-[90%] relative gap-4 overflow-scroll">
          <div className="col-span-2 ">
            <h2 className="mt-2">Select Products</h2>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={handleChange}
              value={selectedOptions}
              options={products}
              placeholder="Select or create options..."
              className="sticky top-0"
            />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-2 gap-2 h-full col-span-3 overflow-scroll w-full">
            {selectedOptions?.map((product, i) => (
              <GroupCard key={i} product={(product = product?.value)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
