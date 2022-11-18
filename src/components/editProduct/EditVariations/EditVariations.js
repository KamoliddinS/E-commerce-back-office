import React, { useState } from "react";

import { deleteProductVariation } from "../../../helpers";

import { useSelector, useDispatch } from "react-redux";
import VariationItem from "./VariationItem";

export default function EditVariations({ files, handleDropMultiFile }) {
  const product = useSelector((state) => state.productEdit.product);
  const token = useSelector((state) => state.user.data.token);

  const { variations, _id } = product;

  return (
    <>
      {variations.map((item, index) => (
        <VariationItem
          index={index}
          item={item}
          token={token}
          files={files}
          handleDropMultiFile={handleDropMultiFile}
          pId={_id}
          onDelete={deleteProductVariation}
        />
      ))}
    </>
  );
}
