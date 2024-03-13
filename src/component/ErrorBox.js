import { Box, Typography } from "@mui/material";

export default function ErrorBox(props) {
  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <Typography>{props.text || "Error loading data"}</Typography>
    </Box>
  );
};
