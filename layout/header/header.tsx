import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Avatar,
  Container,
} from "@mui/material";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileModal from "@/pages/auth/profile";
import { useUserStore } from "@/toolkit/store/store";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { allProfileQuery } from "@/customHooks/query/auth.query.hooks";

const ResponsiveAppBar: React.FC = () => {
  const router = useRouter();
  const { token, setToken, user, setUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productMenuAnchor, setProductMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [pic, setPic] = useState<object | any>();

  const {
    data,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = allProfileQuery();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const pro_pic = localStorage.getItem("user");
      if (pro_pic) {
        try {
          const parsedData: any = JSON.parse(pro_pic);
          //console.log(parsedData);
          setPic(parsedData);
        } catch (error) {
          // console.error("Error parsing JSON:", error);
        }
      }
    }
    //console.log(pic);
  }, [token]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Sync Zustand state with cookies on component mount
  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    } else {
      setToken("");
    }
  }, [cookies.token, setToken, setUser]);

  //logout function
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setToken("");

    toast.success("Logout Successfully");
    router.push("/auth/login");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  //login function
  const handleLogin = () => {
    router.push("/auth/login");
  };

  const productSubItems = [
    { name: "Add-Product", path: "/cms/create" },
    { name: "All-Product", path: "/cms/list" },
  ];

  // Drawer toggle function
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const handleProductMenuToggle = () => {
    setIsProductMenuOpen((prevOpen) => !prevOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: "100vw",
        paddingTop: "10px",
        paddingBottom: "10px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={handleProductMenuToggle}>
          <ListItemText primary="Products" />
          {isProductMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isProductMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {productSubItems.map((item) => (
              <ListItem key={item.name} sx={{ pl: 4 }}>
                <Link href={item.path} passHref>
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem>
          {token ? (
            <>
              <Typography variant="body1" color="initial">
                Hello, {data?.first_name}
              </Typography>
              <Button
                onClick={handleLogout}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sign In
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#123C69",
          boxShadow: 4,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            >
              <FoodBankIcon />
            </IconButton>

            <Typography
              variant="h5"
              component="div"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
                display: { md: "flex" },
              }}
            >
              MY FOOD APP
            </Typography>

            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <Button
                color="inherit"
                onMouseEnter={(e) => setProductMenuAnchor(e.currentTarget)}
                aria-controls="product-menu"
                aria-haspopup="true"
              >
                Products
              </Button>
              <Menu
                id="product-menu"
                anchorEl={productMenuAnchor}
                open={Boolean(productMenuAnchor)}
                onClose={() => setProductMenuAnchor(null)}
                MenuListProps={{
                  onMouseLeave: () => setProductMenuAnchor(null),
                }}
                sx={{ mt: 1 }}
              >
                {productSubItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    onClick={() => setProductMenuAnchor(null)}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        fontFamily: "monospace",
                        color: "inherit",
                      }}
                      href={item.path}
                      passHref
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>

              {token ? (
                <>
                  <Button onClick={handleLogout} color="inherit">
                    Logout
                  </Button>
                  <Typography variant="body1" color="#fff" m="10px">
                    Hello, {data?.first_name}
                  </Typography>
                </>
              ) : (
                <Button onClick={handleLogin} color="inherit">
                  Sign In
                </Button>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {token && data && (
                <Avatar
                  src={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${data.profile_pic}`}
                  sx={{ width: 40, height: 40, cursor: "pointer" }}
                  onClick={openModal}
                />
              )}

              {/* Profile Modal */}
              {isModalOpen && (
                <ProfileModal isOpen={isModalOpen} onClose={closeModal} />
              )}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    width: "30vw",
                    margin: 0,
                    padding: 0,
                    overflowX: "hidden",
                    bgcolor: "#123C69",
                    color:"#fff"
                  },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default ResponsiveAppBar;
