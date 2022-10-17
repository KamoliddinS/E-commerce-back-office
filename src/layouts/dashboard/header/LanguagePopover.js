import { useState, useEffect } from "react";
// @mui
import { MenuItem, Stack } from "@mui/material";
// components
import Image from "../../../components/Image";
import MenuPopover from "../../../components/MenuPopover";
import { IconButtonAnimate } from "../../../components/animate";
// config
import { allLangs } from "../../../config";
// i18n
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);

  const { t, i18n } = useTranslation();
  const selectedLang = localStorage.getItem("lang");
  useEffect(() => {
    const currentLang = localStorage.getItem("lang") || "uz";
    i18n.changeLanguage(currentLang);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) {
      changeLanguage(option.value);
      localStorage.setItem("lang", option.value);
    }
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: "action.selected" }),
        }}
      >
        <Image
          disabledEffect
          src={allLangs.find((element) => element.value === selectedLang).icon}
          alt={allLangs[0].label}
        />
        {console.log(
          allLangs.find((element) => element.value === selectedLang).icon
        )}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {allLangs.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === selectedLang}
              onClick={() => handleClose(option)}
            >
              <Image
                disabledEffect
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
