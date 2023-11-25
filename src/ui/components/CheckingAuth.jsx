import { CircularProgress, Grid } from "@mui/material";
import React from "react";

// Este componente es el vamos a mostrar cada que la app se recargue.
export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid item alignItems="center" justifyContent="center">
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
