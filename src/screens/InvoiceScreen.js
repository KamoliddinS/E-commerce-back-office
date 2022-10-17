import React from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import Invoice from "../components/invoices/Invoice";

const baseURL = "https://minimal-assets-api-dev.vercel.app/api/products";

export default function InvoiceScreen() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.products);
    });
  }, []);
  const products = [];
  if (post) {
    for (let i = 0; i < 24; i++) {
      products.push(post[i]);
    }
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Fakturalar
      </Typography>
      <Invoice data={products} />
    </>
  );
}
