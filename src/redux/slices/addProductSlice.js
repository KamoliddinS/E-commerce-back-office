import { createSlice } from "@reduxjs/toolkit";

const addProductSlice = createSlice({
  name: "addProduct",
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
  },
});

export default addProductSlice.reducer;

// Actions
export const {
  onNextStep,
  onBackStep,
  addBaseProduct,
  removeTechSpecs,
  removeSubValue,
  addSubValue,
  addTechSpecs,
} = addProductSlice.actions;
