import React from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

export default function BaseProductMain() {
  const hiddenFileInput = React.useRef(null);
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const categories = [
    {
      id: 1,
      category: "Movies",
    },
    {
      id: 2,
      category: "Jewelry",
    },
    {
      id: 3,
      category: "Home",
    },
    {
      id: 4,
      category: "Movies",
    },
    {
      id: 5,
      category: "Industrial",
    },
    {
      id: 6,
      category: "Music",
    },
    {
      id: 7,
      category: "Jewelry",
    },
    {
      id: 8,
      category: "Baby",
    },
    {
      id: 9,
      category: "Shoes",
    },
    {
      id: 10,
      category: "Computers",
    },
    {
      id: 11,
      category: "Automotive",
    },
    {
      id: 12,
      category: "Outdoors",
    },
    {
      id: 13,
      category: "Home",
    },
    {
      id: 14,
      category: "Sports",
    },
    {
      id: 15,
      category: "Tools",
    },
  ];
  return (
    <>
      <Box sx={{ width: "50%", marginRight: 5 }}>
        <Typography variant="h5" gutterBottom>
          Ma'lumot Qo'shish
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
            "& .MuiFormControl-root": { width: "100%" },
            "& .MuiTypography-root": { marginTop: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <Typography variant="body2" gutterBottom>
              Mahsulot nomi
            </Typography>
            <TextField
              required
              id="outlined-required"
              placeholder="Changyutgich"
            />
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Mahsulot nomi (Rus Tilida)
            </Typography>
            <TextField required id="outlined-required" placeholder="Пылесос" />
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Malumot
            </Typography>
            <TextField
              required
              id="outlined-required"
              placeholder="O'lchov birligi. Eng kam miqdori. Amal qilish muddati"
            />
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Malumot (Rus Tilida)
            </Typography>
            <TextField
              required
              id="outlined-required"
              placeholder="Единица измерения. Минимальная сумма. Срок годности"
            />
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Tavsif
            </Typography>
            <TextField
              required
              id="outlined-required"
              placeholder="Par dazmol ishlatish uchun qulay va sifatli. Par dazmol sifatli va kafolatlangan bepul xizmatlarimiz bir oygacha yetkazib beramiz  va ishlatib ko`rsatamiz"
            />
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Tavsif (Rus Tilida)
            </Typography>
            <TextField
              required
              id="outlined-required"
              placeholder="Утюг прост в использовании и хорошего качества. Предоставляем качественное и гарантированно бесплатное обслуживание парового утюга на срок до одного месяца"
            />
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Toifa
            </Typography>
            <FormControl sx={{}}>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {categories.map((item) => (
                  <MenuItem value={item.id}>{item.category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Typography variant="body2" gutterBottom>
              Sub Toifa
            </Typography>
            <FormControl sx={{}}>
              <Select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {categories.map((item) => (
                  <MenuItem value={item.id}>{item.category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
      </Box>
    </>
  );
}
