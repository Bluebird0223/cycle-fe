import React, { useRef } from "react";
import { formatDate } from "../../utils/functions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/images/KanchanDeepLogoWhite.png";
import DownloadIcon from "@mui/icons-material/Download";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

export default function OrderBilling({ billData }) {
    const contentRef = useRef();

    const downloadPdf = async (type) => {
        try {
            const content = contentRef.current;

            const originalStyles = {
                height: content.style.height,
                overflow: content.style.overflow,
                backgroundColor: content.style.backgroundColor,
            };

            content.style.height = "auto";
            content.style.overflow = "visible";
            content.style.backgroundColor = "#ffffff";

            const canvas = await html2canvas(content, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            Object.assign(content.style, originalStyles);

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgData = canvas.toDataURL("image/png");

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, (canvas.height * pdfWidth) / canvas.width);

            if (type === "print") {
                const pdfBlob = pdf.output("blob");
                const pdfURL = URL.createObjectURL(pdfBlob);
                const printWindow = window.open(pdfURL, "_blank");

                printWindow.onload = () => {
                    printWindow.print();
                };
            } else {
                pdf.save("Invoice.pdf");
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="w-[70%] h-[90vh] lg:w-[70%] md:w-[90%] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[100%] h-[90%] overflow-y-auto bg-white p-5" ref={contentRef}>
                {/* Header */}
                <div className="flex justify-between items-center bg-[#7d0d02] px-10 py-5">
                    <img src={logo} alt="logo" className="w-[100px]" />
                    <div>
                        <h1 className="text-4xl font-bold text-[#fff] text-end">Invoice</h1>
                        <p className="text-end mt-2 text-[14px] text-white">Order Id:</p>
                        <p className="text-end text-[#fff] text-[14px]">{billData?._id}</p>
                    </div>
                </div>

                {/* Address and Order Details */}
                <div className="px-10 flex justify-between items-start mt-8 mb-4">
                    <div>
                        <p className="text-gray-500 text-[14px] text-start">FROM</p>
                        <p className="font-bold text-[14px] text-start">Maha Handloom</p>
                        <p className="text-[14px] text-start">KanchanDeepJyot.com</p>
                        <div className="mt-6">
                            <p className="text-[14px] text-start capitalize text-gray-500">BILL TO</p>
                            <p className="text-[14px] text-start capitalize font-bold">Name</p>
                            <p className="text-[14px] text-start capitalize w-[250px]">
                                {`${billData?.shippingInfo?.address}, ${billData?.shippingInfo?.city}, ${billData?.shippingInfo?.pincode}`}
                            </p>
                            <p className="text-[14px] text-start capitalize">
                                {`${billData?.shippingInfo?.state}, ${billData?.shippingInfo?.country}`}
                            </p>
                            <p className="text-[14px] text-start capitalize">{billData?.shippingInfo?.phoneNo}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-[14px] text-end">ORDER STATUS</p>
                        <p className={`text-[18px] text-end font-bold capitalize ${
                            billData?.orderStatus?.toLowerCase() === "delivered" ? "text-green-500" : "text-yellow-500"
                        }`}>
                            {billData?.orderStatus}
                        </p>
                        <div className="mt-6">
                            <p className="text-[14px] text-end capitalize text-gray-500">DATE</p>
                            <p className="text-[14px] text-end capitalize">{formatDate(new Date())}</p>
                        </div>
                    </div>
                </div>

                {/* Item Table */}
                <div className="mt-10 px-10">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="border-t border-b border-gray-300 bg-gray-100">
                                <th className="text-start p-2 text-[14px]">Item Name</th>
                                <th className="text-start p-2 text-[14px]">Quantity</th>
                                <th className="text-start p-2 text-[14px]">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billData?.orderItems?.map((ele, index) => (
                                <tr key={index} className="border-t border-b border-gray-300">
                                    <td className="text-start p-2 capitalize text-[14px]">{ele?.name}</td>
                                    <td className="text-start p-2 text-[14px]">{ele?.quantity}</td>
                                    <td className="text-start p-2 text-[14px]">{ele?.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Section Below Table */}
                <div className="mt-6 px-10 flex justify-end">
                    <div>
                        <p className="text-[14px] text-end capitalize text-gray-500">Total Amount</p>
                        <p className="text-[18px] text-end capitalize font-bold">₹{billData?.totalPrice}</p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 px-10 bg-white py-4">
                <button
                    className="bg-primary-blue p-2 text-white font-medium rounded shadow hover:shadow-lg"
                    onClick={() => downloadPdf("download")}
                >
                    <DownloadIcon /> Download
                </button>
                <button
                    className="bg-primary-blue p-2 text-white font-medium rounded shadow hover:shadow-lg"
                    onClick={() => downloadPdf("print")}
                >
                    <LocalPrintshopIcon /> Print
                </button>
            </div>
        </div>
    );
}
