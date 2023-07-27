/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { Box } from "@mui/material";
import Table from "../components/Table";

const Home = () => {
  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Table />
    </Box>
  );
};

export default Home;
