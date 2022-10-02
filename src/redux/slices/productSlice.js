import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    activeStep: 0,
    product: {
      nameuz: "",
      nameru: "",
      infouz: "",
      inforu: "",
      descriptionuz: "",
      descriptionru: "",
      category: "",
      subcategory: "",
      colors: [],
      images: [],
      techSpecs: [
        {
          name: "",
          value: [
            {
              subvalue: "",
            },
          ],
        },
      ],
      brand: "",
      model: "",
      madeIn: "",
      warranty: "",
    },
  },
  reducers: {
    onBackStep(state) {
      state.activeStep > 0 && (state.activeStep -= 1);
    },

    onNextStep(state) {
      state.activeStep < 3 && (state.activeStep += 1);
    },
    addBaseProduct(state, action) {
      state.product = action.payload;
    },
    // add techSpecs
    addTechSpecs(state, action) {
      state.product.techSpecs.push(action.payload);
    },
    // add subvalue
    addSubValue(state, action) {
      state.product.techSpecs[action.payload.index].value.push({
        subvalue: "",
      });
    },
    // remove techSpecs
    removeTechSpecs(state, action) {
      state.product.techSpecs = state.product.techSpecs.filter(
        (item, index) => index !== action.payload
      );
    },
    // remove subvalue
    removeSubValue(state, action) {
      state.product.techSpecs[action.payload.index].value =
        state.product.techSpecs[action.payload.index].value.filter(
          (item, index) => index !== action.payload.subIndex
        );
    },
    // add images
    addImages(state, action) {
      state.product.images = action.payload;
    },
    //remove image
  },
});

export default productSlice.reducer;

// Actions
export const {
  onNextStep,
  onBackStep,
  addBaseProduct,
  removeTechSpecs,
  removeSubValue,
  addSubValue,
  addTechSpecs,
  addImages,
  removeImage,
} = productSlice.actions;
