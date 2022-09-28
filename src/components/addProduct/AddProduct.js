import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BaseProductMain from "./BaseProduct/BaseProductMain";
import BaseProductUpload from "./BaseProduct/BaseProductUpload";
import { Card, Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import VariableSelects from "./VariableProduct/VariableSelects";
import VariableInputs from "./VariableProduct/VariableInputs";

const steps = [
  "Mahsulot m’alumoti",
  "Ozgaruvchan ma'lumot",
  "Rang, hajm, soni",
];

export default function AddProduct() {
  const activeStep = useSelector((state) => state.addProduct.activeStep);
  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Mahsulot Qo'shish
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card sx={{ padding: 2, margin: 5 }}>
        {activeStep === 0 && (
          <Box sx={{ display: "flex" }}>
            <BaseProductMain />
            <BaseProductUpload />
          </Box>
        )}
        {activeStep === 1 && (
          <>
            <VariableSelects />
            <VariableInputs />
          </>
        )}
      </Card>
    </>
  );
}
