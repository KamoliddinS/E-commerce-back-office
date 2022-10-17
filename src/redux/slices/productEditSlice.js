import { createSlice } from "@reduxjs/toolkit";

const productEditSlice = createSlice({
  name: "productEdit",
  initialState: {
    editMode: true,
    activeStep: 0,
    product: {
      nameuz: "Samsung S21",
      nameru: "Samsung S21",
      infouz: "8/256",
      inforu: "8/256",
      descriptionuz:
        "64 megapikselli aniqlikda ajoyib ravshanlik bilan suratga oling. Suratlaringiz san'at asarlariga o'xshaydi. 10MP old kamera juda ko'p tafsilotlarni aks ettiradi va tezkor avtofokus sizga ajoyib suratlarni tezda olishingizni ta'minlaydi. Bir marta suratga oling va AI sizni eng yaxshisini tanlash uchun uni fotosurat va videoga aylantiradi.",
      descriptionru:
        "64 megapikselli aniqlikda ajoyib ravshanlik bilan suratga oling. Suratlaringiz san'at asarlariga o'xshaydi. 10MP old kamera juda ko'p tafsilotlarni aks ettiradi va tezkor avtofokus sizga ajoyib suratlarni tezda olishingizni ta'minlaydi. Bir marta suratga oling va AI sizni eng yaxshisini tanlash uchun uni fotosurat va videoga aylantiradi.",
      category: "Electronics",
      subcategory: "Shoes",
      images: [],
      techSpecs: [
        {
          screenSize: [
            {
              name: "Screen Size",
              title: "asd",
              value: "wqe",
            },
          ],
        },
        {
          processor: [
            {
              name: "Processor",
              title: "czxc",
              value: "fdg",
            },
            {
              name: "Processor",
              title: "qwe",
              value: "dsf",
            },
          ],
        },
        {
          color: [
            {
              name: "Color",
              title: "Black",
              value: "#0d0d0d",
            },
            {
              name: "Color",
              title: "Red",
              value: "#b40404",
            },
            {
              name: "Color",
              title: "Yellow",
              value: "#efaf01",
            },
          ],
        },
      ],
      brand: {
        id: 1,
        label: "Samsung",
      },
      model: "Galaxy S21",
      madeIn: "2021",
      warranty: "1 Yil",
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
    //remove image
  },
});

export default productEditSlice.reducer;

// Actions
export const { onBackStep, onNextStep, addBaseProduct } =
  productEditSlice.actions;
