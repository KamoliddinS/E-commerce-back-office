// import React from 'react'
// // @mui
// import { Stack, Typography, Box } from '@mui/material'
// // components
// import ChartItem from './ChartItem'

// export default function ChartList() {

//     // income data for line chart by months
//     const data = [
//         {
//             id: 1,
//             series: [{
//                 name: "Desktops",
//                 data: [10, 41, 35, 51, 49, 62, 69, 91, 14]
//             }],
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
//         },
//         {
//             id: 2,
//             series: [{
//                 name: "Desktops",
//                 data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//             }],
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
//         },
//         {
//             id: 3,
//             series: [{
//                 name: "Desktops",
//                 data: [10, 41, 35, 51, 49, 62, 69, 91, 18]
//             }],
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
//         }
//     ]

//   return (
//     // map chart datas

//     <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>

//     {data.map((item) => (
//         <Box key={item.id} sx={{ width: '100%' }}>
//             <ChartItem item={item} />
//         </Box>

//         ))}
//   </Stack>
//     )
// }
