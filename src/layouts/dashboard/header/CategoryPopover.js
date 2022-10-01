import CategoryDrawer from "../../../components/category/CategoryDrawer";
import CategoryDrawerConfig from "../../../components/category/CategoryDrawerConfig";
import React, { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/slices/categorySlice";
// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <CategoryDrawer
        navConfig={CategoryDrawerConfig}
        categories={categories}
      />
    </>
  );
}
