import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Form from "./Form";
import Navbar from "scenes/navbar";

const SettingPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const loggedInUserId = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Box>
          <Navbar />
        </Box>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Form />
        </Box>
      </Box>
    </>
  );
};

export default SettingPage;
