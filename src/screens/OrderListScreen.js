import React from "react";
import { Typography, Skeleton, Stack } from "@mui/material";
import ProductList from "../components/productList/ProductList";
import axios from "axios";

const baseURL = "https://minimal-assets-api-dev.vercel.app/api/products";

export default function BaseProductLayout() {
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
        Order List
      </Typography>
      {/* <Stack direction="row"> */}
      {/* </Stack> */}

      <ProductList data={products} />
    </>
  );
}
