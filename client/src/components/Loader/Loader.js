import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Loader.css";

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }} className="loader">
      <CircularProgress />
    </Box>
  );
}
