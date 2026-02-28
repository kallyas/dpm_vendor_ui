import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import SharedTable from "../shared/sharedTable/SharedTable";
import { useGetRoutesQuery } from "../../redux/api/apiSlice";

const RoutesPage = () => {
  const { data: routes = [], isLoading, error } = useGetRoutesQuery();

  const headers = [
    { label: "Route Code", key: "route_code" },
    { label: "From", key: "start_point" },
    { label: "To", key: "destination" },
  ];

  const handleCheck = ({ target }) => {
    const { checked, id } = target;
  };

  const allChecked = false;
  const fetching = isLoading;

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#A2302F",
            mb: 1,
          }}
        >
          Routes Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
          }}
        >
          View and manage all routes in your system.
        </Typography>
      </Box>
      <SharedTable
        fetching={fetching}
        hideDock={true}
        handleCheck={handleCheck}
        tableBody={routes}
        headers={headers}
        allChecked={allChecked}
      />
    </Container>
  );
};

export default RoutesPage;
