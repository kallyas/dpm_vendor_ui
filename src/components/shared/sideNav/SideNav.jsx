import React, {useState} from "react"
import {useNavigate, useLocation} from "react-router-dom"
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material"
import {
  Dashboard,
  DirectionsBus,
  CompareArrows,
  CardTravel,
  People,
  ExitToApp,
  Menu as MenuIcon,
  MonetizationOn as MonetizationOnIcon,
  ChevronLeft,
} from "@mui/icons-material"

const navItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Buses", icon: <DirectionsBus />, path: "/vehicles" },
  { text: "Trips", icon: <CardTravel />, path: "/trips" },
  { text: "Routes", icon: <CompareArrows />, path: "/routes" },
  { text: "Staff", icon: <People />, path: "/users" },
  { text: "Transactions", icon: <MonetizationOnIcon />, path: "/transactions" },
]

const DRAWER_WIDTH = 260

export const SideNav = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          component="img"
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${theme.palette.primary.main}`,
          }}
          alt="Bus operator logo"
          src="https://via.placeholder.com/150"
        />
      </Box>
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "white" : "primary.main",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <List sx={{ px: 2, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/logout")}
            sx={{
              borderRadius: 2,
              "&:hover": { bgcolor: "error.light" },
            }}
          >
            <ListItemIcon sx={{ color: "error.main", minWidth: 40 }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ color: "error.main" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1200,
            bgcolor: "white",
            boxShadow: 1,
            "&:hover": { bgcolor: "white" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            border: "none",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
