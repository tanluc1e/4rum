import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`${process.env.SERVER_URL}:3001/assets/${image}`}
        alt="user"
        width={size}
        height={size}
        style={{ objectFit: "cover", borderRadius: "50%" }}
      />
    </Box>
  );
};

export default UserImage;
