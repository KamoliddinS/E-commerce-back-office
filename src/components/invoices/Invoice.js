import React from "react";
import InvoiceTable from "./InvoiceTable";

export default function Invoice({ data }) {
  return (
    <>
      <InvoiceTable data={data} />
    </>
  );
}
