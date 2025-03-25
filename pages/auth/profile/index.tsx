import React from "react";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { allProfileQuery } from "@/customHooks/query/auth.query.hooks";
import { profilemodalProps } from "@/typeScript/auth.interface";

const ProfileModal: React.FC<profilemodalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = allProfileQuery();

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="profile-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            height: 400,
            bgcolor: "#EEE2DC",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#AC3B61",
            }}
          >
            <Typography id="profile-title" variant="h5">
              <strong>Profile Details</strong>
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {isPendingCategories ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : isErrorCategories ? (
            <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
              Error fetching profile details.
            </Typography>
          ) : (
            data && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Avatar
                  src={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${data.profile_pic}`}
                  alt="existing"
                  sx={{
                    width: 150,
                    height: 150,
                    mx: "auto",
                    mb: 2,
                    border: "3px solid rgb(15, 41, 97)",
                  }}
                />
                <Typography variant="h6">
                  <strong>First Name:</strong> {data.first_name}
                </Typography>
                <Typography variant="h6">
                  <strong>Last Name: </strong>
                  {data.last_name}
                </Typography>
                <Typography>
                  <strong>Email: </strong>
                  {data.email}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModal;
