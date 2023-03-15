import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updatedUser } from "state";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const [user, setUser] = useState("");

  const getUser = async () => {
    const response = await fetch(
      `${process.env.SERVER_URL}:3001/users/${_id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await fetch(
      `${process.env.SERVER_URL}:3001/users/${_id}/setpassword/pass`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      }
    );
    const data = await response.json();
    onSubmitProps.resetForm();
    dispatch(updatedUser(values));
    toast.success("Changed!", {
      position: "bottom-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          _id: _id,
          password: "",
          firstName: "",
          lastName: "",
          location: "",
          occupation: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="First Name"
                name="firstName"
                onChange={handleChange}
                placeholder={user.firstName}
                value={values.firstName || ""}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                placeholder={user.lastName}
                value={values.lastName || ""}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="New Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Location"
                name="location"
                onChange={handleChange}
                placeholder={user.location}
                value={values.location || ""}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Occupation"
                name="occupation"
                onChange={handleChange}
                placeholder={user.occupation}
                value={values.occupation || ""}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Save
            </Button>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default Form;
