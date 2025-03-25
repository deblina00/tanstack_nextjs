import React from "react";
import {
  Box,
  Modal,
  CircularProgress,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { detailmodalProps } from "@/typeScript/cms.interface";
import { fetchProductsQuery } from "@/customHooks/query/cms.query.hooks";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "#F6F0ED",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Details: React.FC<detailmodalProps & { id: string | number }> = ({
  isOpen,
  onClose,
  id,
}) => {
  const { data, isLoading, isError } = fetchProductsQuery(id);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-details-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="product-details-title"
          variant="h6"
          component="h2"
          mb={2}
          align="center"
          sx={{ color: "#AC3B61", fontWeight: "bold", fontSize: "25px" }}
        >
          Product Details
        </Typography>
        <Box>
          {isLoading && (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          )}
          {isError && (
            <Typography color="error" textAlign="center">
              Failed to load product details. Please try again.
            </Typography>
          )}
          {data && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Avatar
                src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${data.image}`}
                alt="Existing"
                sx={{
                  width: 150,
                  height: 150,
                  mx: "auto",
                  mb: 2,
                }}
              />
              <Typography variant="subtitle1">
                <strong>Name:</strong> {data.title}
              </Typography>
              <Typography variant="body2" mt={1}>
                <strong>Description:</strong> {data.description}
              </Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: "#123C69" }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Details;
