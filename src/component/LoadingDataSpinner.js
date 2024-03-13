import { Box, CircularProgress } from "@mui/material";

export default function LoadinDataSpinner() {
  return (
    <Box sx={{ display: "flex" }} justifyContent="center">
      <CircularProgress />
    </Box>
  );
}
