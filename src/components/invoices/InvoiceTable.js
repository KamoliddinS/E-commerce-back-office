import * as React from "react";
import { Table, Stack, Avatar, Typography, Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "../Image";
import { fCurrency } from "../../utils/formatNumber";
import Iconify from "../Iconify";

// unsplash.com random photo
// generate

const rows = [
  {
    id: 1,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 2,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 3,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 4,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 5,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 6,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 7,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
  {
    id: 8,
    photo:
      "https://images.unsplash.com/photo-1582395787198-630d7fb2bfbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    name: "Kirtortgich Samsung galaxy",
    avalable: 35,
    applicationNumber: "5642121",
    price: "13000000",
    date: "07.08.2020",
    jshiir: "231122563",
    user: [
      {
        name: "Ulugbek Nagmatov",
        number: "998979051551",
        status: "approved",
        avatar:
          "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
      },
    ],
  },
];

export default function InvoiceTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "95%", margin: "0 auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Rasmi</TableCell>
            <TableCell>Nomlanishi</TableCell>
            <TableCell>Mahsulot soni</TableCell>
            <TableCell>Shartnoma №</TableCell>
            <TableCell>Summasi</TableCell>
            <TableCell>Sanasi</TableCell>
            <TableCell>JSHIIR</TableCell>
            <TableCell>Mijoz tafsilotlari</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {" "}
                <Image
                  sx={{ width: 50, height: 50, borderRadius: 1 }}
                  src={row.photo}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.avalable}</TableCell>
              <TableCell>№-{row.applicationNumber}</TableCell>
              <TableCell>{fCurrency(row.price)} uzs</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.jshiir}</TableCell>
              <TableCell>
                {" "}
                {row.user.map((item) => (
                  <>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar src={item.avatar} />
                      <Stack direction="column">
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="caption">
                          +{item.number}
                        </Typography>
                      </Stack>
                    </Stack>
                  </>
                ))}{" "}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon="fluent:print-32-regular" />}
                  >
                    Muhrlash
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Iconify icon="bi:filetype-pdf" />}
                    endIcon={<Iconify icon="akar-icons:download" />}
                  >
                    Yuklab olish
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
