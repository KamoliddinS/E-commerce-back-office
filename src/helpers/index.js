import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function deleteProduct(id, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${BASE_URL}/api/products/${id}`, config);
  console.log(response);
  return response.data;
}
