import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box, Stack } from "@mui/material";

const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
    const router = useRouter();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "#2f2f2f",
              fontWeight: "bold",
              fontFamily: playfairDisplay.style.fontFamily,
            }}
          >
            Welcome to My Food Delivery App
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push("/auth/login")}
            sx={{
              px: 3,
              py: 1.2,
              bgcolor: "#123C69",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#123C69",
                border: "2px solid #123C69",
                transform: "scale(1.05)",
              },
            }}
          >
            Explore Now
          </Button>
        </Container>
      </Box>
    </>
  );
}
