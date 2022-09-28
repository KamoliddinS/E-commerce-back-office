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

// for (var i = 0; i < categories.length; i++) {
//   console.log(categories[i].title);
//   for (var j = 0; j < Object.keys(categories[i].value).length; j++) {
//       console.log('  ' + categories[i].value[j].title);
//       for (var k = 0; k < Object.keys(categories[i].value[j].value).length; k++) {
//       console.log('    ' + categories[i].value[j].value[k].name);
//       }
//   }
//   }
