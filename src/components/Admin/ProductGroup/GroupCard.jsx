import React from "react";

export default function GroupCard({ product }) {
  const p = JSON.parse(product);
  return (
    <div className="text-center p-2 group">
      <div className="border h-24 w-full overflow-hidden">
        <img className=" group-hover:scale-110" src={p?.brand?.logo?.url} alt="" />
      </div>
      <h2 className="text-sm">{p.name}</h2>
      <h3 className="text-sm text-gray-600">
       Rs.  <span className="line-through">{p.cuttedPrice}</span> | {p.price}
      </h3>
    </div>
  );
}

