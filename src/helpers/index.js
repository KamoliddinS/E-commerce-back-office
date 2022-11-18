import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function deleteProduct(id, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${BASE_URL}/api/products/${id}`, config);
  return response.data;
}
export async function deleteProductVariation(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  const response = await axios.delete(
    `${BASE_URL}/api/products/${data.pId}/variations/${data.vId}`,
    config
  );
  return response.data;
}
