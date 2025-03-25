import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        bgcolor: "#123C69",
        boxShadow: 4,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#fff" }}
        >
          Copyright © {new Date().getFullYear()} by Deblina Roy | All rights
          reserved | Powered by Next.JS
        </Typography>
        <Box mt={1}>
          <Link
            href="/privacy-policy"
            color="inherit"
            sx={{ mx: 1, color: "#fff" }}
          >
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" sx={{ mx: 1, color: "#fff" }}>
            Terms of Service
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
