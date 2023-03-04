import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Form from "./From";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const loggedInUserId = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUserId) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      {loggedInUserId ? (
        <></>
      ) : (
        <Box>
          <Box
            width="100%"
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
          >
            <Typography fontWeight="bold" fontSize="32px" color="primary">
              4rum
            </Typography>
          </Box>

          <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
          >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              Welcome to 4rum
            </Typography>
            <Form />
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
