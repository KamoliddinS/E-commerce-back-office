import React from "react";
// @mui
import { Box, Typography, Stack } from "@mui/material";
// apexcharts
import Chart from "react-apexcharts";

export default function ChartItem({ item }) {
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: item.categories,
    },
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            {item.title}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Chart options={options} series={item.series} type="line" />
        </Box>
      </Stack>
    </Box>
  );
}
