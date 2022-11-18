// import React, { useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
// // i18n
// import { useTranslation } from "react-i18next";
// // components
// import ChartList from "./ChartList";
// import { Grid } from "@mui/material";
// import WidgetChart from "../charts/WidgetChart";
// import RadialChart from "../charts/RadialChart";
// import TwoLinedChart from "../charts/TwoLinedChart";

// export default function Money() {
//   const theme = useTheme();

//   const { t } = useTranslation();

//   //array of random numbers for chart
//   const randomNumbers = Array.from({ length: 9 }, () =>
//     Math.floor(Math.random() * 100)
//   );

//   return (
//     <>
//       {/* <h2>{t("title")}</h2> */}
//       {/* <ChartList /> */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <WidgetChart
//             title="Sotilgan mahsulot"
//             percent={2.6}
//             total={765}
//             chartColor={theme.palette.primary.main}
//             chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <WidgetChart
//             title="Mahsulotning umumiy sotilgan hajmi"
//             percent={-1.6}
//             total={160000000}
//             chartColor={theme.palette.chart.green[0]}
//             chartData={[22, 60, 35, 50, 82, 84, 77, 50, 87, 12]}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <WidgetChart
//             title="Qolgan mahsulot hajmi"
//             percent={5.6}
//             total={520}
//             chartColor={theme.palette.primary.main}
//             chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <RadialChart
//             title="Jins bo'yicha sotish"
//             total={2324}
//             chartData={[
//               { label: "Erkaklar", value: 44 },
//               { label: "Ayollar", value: 75 },
//             ]}
//             chartColors={[
//               [theme.palette.primary.light, theme.palette.primary.main],
//               [theme.palette.warning.light, theme.palette.warning.main],
//             ]}
//           />
//         </Grid>
//         <Grid item xs={12} md={6} lg={8}>
//           <TwoLinedChart
//             title="Yillik sotuvlar"
//             subheader="(+43%) O'tgan yilga qaraganda"
//             chartLabels={[
//               "Yanvar",
//               "Fevral",
//               "Mart",
//               "Aprel",
//               "May",
//               "Iyun",
//               "Iyul",
//               "Avgust",
//               "Sentabr",
//             ]}
//             chartData={[
//               {
//                 year: "2019",
//                 data: [
//                   {
//                     name: "Umumiy daromad",
//                     data: [10, 41, 35, 151, 49, 62, 69, 91, 48],
//                   },
//                   {
//                     name: "Umumiy xarajatlar",
//                     data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
//                   },
//                 ],
//               },
//               {
//                 year: "2020",
//                 data: [
//                   {
//                     name: "Umumiy daromad",
//                     data: [148, 91, 69, 62, 49, 51, 35, 41, 10],
//                   },
//                   {
//                     name: "Umumiy xarajatlar",
//                     data: [45, 77, 99, 88, 77, 56, 13, 34, 10],
//                   },
//                 ],
//               },
//             ]}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// }
