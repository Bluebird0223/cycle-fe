"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useSnackbar } from "notistack"
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  CircularProgress,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import LockIcon from "@mui/icons-material/Lock"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"

import BackdropLoader from "../Layouts/BackdropLoader"
import MetaData from "../Layouts/MetaData"
import publicCommunication from "../../service/publicCommunication"
import { setCookie } from "cookies-next"
import kanchanLogo from "./KanchanDeepLogoWhite.png"
import { clearErrors, loadingFalse, loginFail, loginRequest, loginSuccess } from "../../store/userSlice"
import { initializeWishlist } from "../../store/wishlistSlice"
import { initializeCart } from "../../store/cartSlice"

// Create custom theme with purple primary color and responsive typography
const theme = createTheme({
  palette: {
    primary: {
      main: "#8a4baf",
      light: "#a56cc4",
      dark: "#6a3b8a",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
      "@media (max-width:600px)": {
        fontSize: "1.75rem",
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      "@media (max-width:600px)": {
        fontSize: "0.8125rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "12px",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
})

// Enhanced floating shapes component with responsive sizing
const FloatingShapes = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    {/* Floating circles */}
    {[...Array(6)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: "absolute",
          borderRadius: "50%",
          background: `linear-gradient(45deg, rgba(138, 75, 175, 0.1), rgba(106, 95, 234, 0.1))`,
          "@keyframes float": {
            "0%, 100%": {
              transform: "translateY(0px) rotate(0deg)",
            },
            "50%": {
              transform: "translateY(-20px) rotate(180deg)",
            },
          },
          animation: `float ${4 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          width: {
            xs: `${40 + i * 15}px`,
            sm: `${60 + i * 20}px`,
          },
          height: {
            xs: `${40 + i * 15}px`,
            sm: `${60 + i * 20}px`,
          },
          left: `${10 + i * 15}%`,
          top: `${10 + i * 10}%`,
          display: { xs: i > 3 ? "none" : "block", sm: "block" }, // Hide some shapes on mobile
        }}
      />
    ))}

    {/* Floating triangles */}
    {[...Array(4)].map((_, i) => (
      <Box
        key={`triangle-${i}`}
        sx={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: {
            xs: `${10 + i * 4}px solid transparent`,
            sm: `${15 + i * 5}px solid transparent`,
          },
          borderRight: {
            xs: `${10 + i * 4}px solid transparent`,
            sm: `${15 + i * 5}px solid transparent`,
          },
          borderBottom: {
            xs: `${15 + i * 6}px solid rgba(138, 75, 175, 0.08)`,
            sm: `${20 + i * 8}px solid rgba(138, 75, 175, 0.08)`,
          },
          "@keyframes triangleFloat": {
            "0%, 100%": {
              transform: "translateY(0px) rotate(0deg)",
            },
            "33%": {
              transform: "translateY(-15px) rotate(120deg)",
            },
            "66%": {
              transform: "translateY(-10px) rotate(240deg)",
            },
          },
          animation: `triangleFloat ${6 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.8}s`,
          right: `${5 + i * 20}%`,
          top: `${20 + i * 15}%`,
          display: { xs: i > 2 ? "none" : "block", sm: "block" }, // Hide some shapes on mobile
        }}
      />
    ))}

    {/* Animated gradient orbs */}
    {[...Array(3)].map((_, i) => (
      <Box
        key={`orb-${i}`}
        sx={{
          position: "absolute",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(138, 75, 175, 0.15), rgba(106, 95, 234, 0.05))`,
          filter: "blur(1px)",
          "@keyframes orbFloat": {
            "0%": {
              transform: "translate(0px, 0px) scale(1)",
            },
            "33%": {
              transform: "translate(30px, -30px) scale(1.1)",
            },
            "66%": {
              transform: "translate(-20px, 20px) scale(0.9)",
            },
            "100%": {
              transform: "translate(0px, 0px) scale(1)",
            },
          },
          animation: `orbFloat ${8 + i * 2}s ease-in-out infinite`,
          width: {
            xs: `${70 + i * 30}px`,
            sm: `${100 + i * 50}px`,
          },
          height: {
            xs: `${70 + i * 30}px`,
            sm: `${100 + i * 50}px`,
          },
          left: `${60 + i * 10}%`,
          bottom: `${10 + i * 20}%`,
          display: { xs: i > 1 ? "none" : "block", sm: "block" }, // Hide some shapes on mobile
        }}
      />
    ))}
  </Box>
)

// Custom animated input component
const AnimatedInput = ({
  id,
  label,
  type,
  value,
  onChange,
  required,
  icon,
  endAdornment,
  animationDelay,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    setHasValue(value !== "")
  }, [value])

  return (
    <Box
      sx={{
        position: "relative",
        mb: 3,
        "@keyframes inputEntrance": {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        animation: `inputEntrance 0.6s ease-out ${animationDelay}s forwards`,
        opacity: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          background: "linear-gradient(90deg, #8a4baf, #6a5fea)",
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          ...(focused && {
            transform: "scaleX(1)",
          }),
          zIndex: 2,
          borderRadius: "2px",
        }}
      />

      <TextField
        fullWidth
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e)
          if (!touched) setTouched(true)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: { xs: "52px", sm: "56px" },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover fieldset": {
              borderColor: "#8a4baf",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8a4baf",
              borderWidth: "2px",
            },
            "& fieldset": {
              transition: "border-color 0.3s, border-width 0.3s, box-shadow 0.3s",
            },
            ...(focused && {
              "& fieldset": {
                boxShadow: "0 0 0 3px rgba(138, 75, 175, 0.1)",
              },
            }),
          },
          "& .MuiInputLabel-root": {
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            ...(focused && {
              color: "#8a4baf",
            }),
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#8a4baf",
          },
          "& .MuiInputBase-input": {
            transition: "padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            ...(focused && {
              paddingBottom: "4px",
            }),
          },
        }}
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start">
              {React.cloneElement(icon, {
                sx: {
                  color: focused ? "#8a4baf" : "text.secondary",
                  transition: "color 0.3s, transform 0.3s",
                  transform: focused ? "scale(1.1)" : "scale(1)",
                },
              })}
            </InputAdornment>
          ),
          endAdornment: endAdornment,
        }}
      />

      {touched && !hasValue && (
        <Typography
          variant="caption"
          sx={{
            color: "#d32f2f",
            mt: 0.5,
            display: "block",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            animation: "fadeIn 0.3s",
          }}
        >
          {label} is required
        </Typography>
      )}
    </Box>
  )
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const { loading, isAuthenticated, error } = useSelector((state) => state.user)

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localLoading, setLocalLoading] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      enqueueSnackbar("Please fill in all required fields", { variant: "error" })
      return
    }

    setLocalLoading(true)

    try {
      dispatch(loginRequest())
      const serverResponse = await publicCommunication?.loginUser(email, password)
      if (serverResponse?.data?.success) {
        enqueueSnackbar("Login Successful", { variant: "success" })
        if (serverResponse?.data?.user?.role === "admin") {
          dispatch(loadingFalse())
          setCookie(process.env.REACT_APP_ADMIN_TOKENNAME, serverResponse?.data?.token)
          setCookie(process.env.REACT_APP_ADMINDETAILS, serverResponse?.data?.user)
          navigate("/admin/dashboard")
        } else {
          dispatch(loginSuccess(serverResponse?.data?.user))
          dispatch(initializeWishlist(serverResponse?.data?.user?.wishlist))
          dispatch(initializeCart(serverResponse?.data?.user?.cart))
          const userDetails = {
            id: serverResponse?.data?.user?._id,
            avatar: serverResponse?.data?.user?.avatar,
            email: serverResponse?.data?.user?.email,
            gender: serverResponse?.data?.user?.gender,
            name: serverResponse?.data?.user?.name,
            role: serverResponse?.data?.user?.role,
          }
          setCookie(process.env.REACT_APP_USERDETAILS, userDetails)
          setCookie(process.env.REACT_APP_TOKENNAME, serverResponse?.data?.token)
          navigate("/")
        }
      } else {
        dispatch(loginFail(serverResponse?.data?.message))
      }
    } catch (error) {
      console.log(error)
      dispatch(loginFail(error?.message))
    } finally {
      setLocalLoading(false)
    }
  }

  const redirect = location.search ? location.search.split("=")[1] : "account"

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" })
      dispatch(clearErrors())
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`)
    }
  }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar])

  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Login | KanchanDeepJyot" />

      {loading && <BackdropLoader />}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          background: `
            radial-gradient(circle at 20% 80%, rgba(138, 75, 175, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(106, 95, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f8fafc 75%, #f1f5f9 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 400% 400%",
          "@keyframes gradientShift": {
            "0%": {
              backgroundPosition: "0% 50%, 100% 50%, 50% 50%, 0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%, 0% 50%, 50% 50%, 100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%, 100% 50%, 50% 50%, 0% 50%",
            },
          },
          animation: "gradientShift 15s ease infinite",
          padding: { xs: 2, sm: 3, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FloatingShapes />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: { xs: 3, sm: 4 },
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: `
                0 20px 25px -5px rgba(138, 75, 175, 0.1),
                0 10px 10px -5px rgba(138, 75, 175, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
              "@keyframes paperFloat": {
                "0%, 100%": {
                  transform: "translateY(0px) scale(1)",
                  opacity: 1,
                },
                "50%": {
                  transform: "translateY(-5px) scale(1)",
                  opacity: 1,
                },
              },
              "@keyframes fadeInScale": {
                "0%": {
                  opacity: 0,
                  transform: "scale(0.9) translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "scale(1) translateY(0px)",
                },
              },
              animation: "fadeInScale 0.8s ease-out, paperFloat 6s ease-in-out 0.8s infinite",
            }}
          >
            <Grid container>
              {/* Left Column - Decorative */}
              <Grid
                item
                xs={0}
                sm={5}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  position: "relative",
                  background: `
                    linear-gradient(135deg, #8a4baf 0%, #6a5fea 50%, #8b5cf6 100%),
                    radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)
                  `,
                  padding: { sm: 4, md: 5 },
                  color: "white",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                  "@keyframes slideInLeft": {
                    "0%": {
                      opacity: 0,
                      transform: "translateX(-30px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                  animation: "slideInLeft 0.8s ease-out 0.2s forwards",
                  opacity: 0,
                }}
              >
                {/* Animated background pattern */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.1,
                    background: `
                      radial-gradient(circle at 20% 20%, white 2px, transparent 2px),
                      radial-gradient(circle at 80% 80%, white 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px, 20px 20px",
                    "@keyframes patternMove": {
                      "0%": {
                        transform: "translate(0, 0)",
                      },
                      "100%": {
                        transform: "translate(10px, 10px)",
                      },
                    },
                    animation: "patternMove 20s linear infinite",
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      mb: 1,
                      "@keyframes textGlow": {
                        "0%, 100%": {
                          textShadow: "0 0 5px rgba(255,255,255,0.5)",
                        },
                        "50%": {
                          textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6)",
                        },
                      },
                      animation: "textGlow 3s ease-in-out infinite",
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                    Access Your Orders, Wishlist, and Personalized Recommendations
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    padding: "0 40px",
                    "@keyframes logoFloat": {
                      "0%, 100%": {
                        transform: "translateY(0px) rotate(0deg)",
                      },
                      "50%": {
                        transform: "translateY(-10px) rotate(2deg)",
                      },
                    },
                    animation: "logoFloat 4s ease-in-out infinite",
                  }}
                >
                  <img
                    src={kanchanLogo || "/placeholder.svg"}
                    alt="Kanchan deep logo"
                    style={{
                      maxWidth: "100%",
                      filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
                    }}
                  />
                </Box>
              </Grid>

              {/* Right Column - Form */}
              <Grid item xs={12} sm={7}>
                <Box
                  sx={{
                    p: { xs: 3, sm: 4, md: 5 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "@keyframes slideInRight": {
                      "0%": {
                        opacity: 0,
                        transform: "translateX(30px)",
                      },
                      "100%": {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                    },
                    animation: "slideInRight 0.8s ease-out 0.4s forwards",
                    opacity: 0,
                  }}
                >
                  {/* Mobile logo - only shown on small screens */}
                  {isMobile && (
                    <Box
                      sx={{
                        width: "80px",
                        height: "80px",
                        mb: 3,
                        "@keyframes fadeInDown": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(-20px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                        animation: "fadeInDown 0.8s ease-out",
                      }}
                    >
                      <img
                        src={kanchanLogo || "/placeholder.svg"}
                        alt="Kanchan deep logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      mb: 2,
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #8a4baf, #6a5fea)",
                      "@keyframes iconPulse": {
                        "0%, 100%": {
                          transform: "scale(1)",
                          boxShadow: "0 0 0 0 rgba(138, 75, 175, 0.4)",
                        },
                        "50%": {
                          transform: "scale(1.05)",
                          boxShadow: "0 0 0 10px rgba(138, 75, 175, 0)",
                        },
                      },
                      animation: "iconPulse 2s ease-in-out infinite",
                    }}
                  >
                    <PersonIcon sx={{ color: "white", fontSize: { xs: 24, sm: 30 } }} />
                  </Box>

                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, textAlign: "center" }}>
                    Sign In
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
                    Please enter your details
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{ width: "100%", maxWidth: { xs: "100%", sm: "400px" } }}
                  >
                    <AnimatedInput
                      id="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      icon={<EmailIcon />}
                      animationDelay={0.6}
                      autoComplete="email"
                    />

                    <AnimatedInput
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      icon={<LockIcon />}
                      animationDelay={0.7}
                      autoComplete="current-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            aria-label="toggle password visibility"
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(138, 75, 175, 0.1)",
                              },
                              transition: "all 0.3s",
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 3,
                        "@keyframes slideInUp": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                        animation: "slideInUp 0.6s ease-out 0.8s forwards",
                        opacity: 0,
                      }}
                    >
                      <Link to="/password/forgot" style={{ textDecoration: "none" }}>
                        <Typography
                          variant="body2"
                          color="#8a4baf"
                          sx={{
                            "&:hover": {
                              textDecoration: "underline",
                              color: "#6a3b8a",
                            },
                            transition: "all 0.3s",
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              width: "100%",
                              height: "1px",
                              background: "linear-gradient(90deg, #8a4baf, #6a5fea)",
                              transformOrigin: "left",
                              transform: "scaleX(0)",
                              transition: "transform 0.3s ease",
                            },
                            "&:hover::after": {
                              transform: "scaleX(1)",
                            },
                          }}
                        >
                          Forgot Password?
                        </Typography>
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={localLoading}
                      sx={{
                        height: { xs: "48px", sm: "56px" },
                        mb: 2,
                        background: "linear-gradient(135deg, #8a4baf 0%, #6a5fea 100%)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #7a3b9f 0%, #5a4fda 100%)",
                          boxShadow: "0 8px 25px rgba(138, 75, 175, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        "&:active": {
                          transform: "translateY(0px)",
                        },
                        textTransform: "none",
                        fontSize: { xs: "15px", sm: "16px" },
                        fontWeight: 600,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "@keyframes buttonPulse": {
                          "0%": {
                            boxShadow: "0 0 0 0 rgba(138, 75, 175, 0.4)",
                          },
                          "70%": {
                            boxShadow: "0 0 0 10px rgba(138, 75, 175, 0)",
                          },
                          "100%": {
                            boxShadow: "0 0 0 0 rgba(138, 75, 175, 0)",
                          },
                        },
                        animation: "buttonPulse 2s infinite, slideInUp 0.6s ease-out 0.9s forwards",
                        opacity: 0,
                      }}
                    >
                      {localLoading ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CircularProgress
                            size={24}
                            color="inherit"
                            sx={{
                              mr: 1,
                              "@keyframes spin": {
                                "0%": {
                                  transform: "rotate(0deg)",
                                },
                                "100%": {
                                  transform: "rotate(360deg)",
                                },
                              },
                              animation: "spin 1s linear infinite",
                            }}
                          />
                          Signing in...
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "& svg": {
                              transition: "transform 0.3s ease",
                            },
                            "&:hover svg": {
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          Sign In
                          <ArrowForwardIcon sx={{ ml: 1, fontSize: { xs: 16, sm: 18 } }} />
                        </Box>
                      )}
                    </Button>

                    <Box
                      sx={{
                        textAlign: "center",
                        mt: 3,
                        "@keyframes slideInUp": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                        animation: "slideInUp 0.6s ease-out 1s forwards",
                        opacity: 0,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        New to KanchanDeepJyot?{" "}
                        <Link to="/register" style={{ textDecoration: "none" }}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="#8a4baf"
                            sx={{
                              fontWeight: 500,
                              position: "relative",
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: -2,
                                left: 0,
                                width: "100%",
                                height: "1px",
                                background: "linear-gradient(90deg, #8a4baf, #6a5fea)",
                                transformOrigin: "left",
                                transform: "scaleX(0)",
                                transition: "transform 0.3s ease",
                              },
                              "&:hover::after": {
                                transform: "scaleX(1)",
                              },
                            }}
                          >
                            Create an account
                          </Typography>
                        </Link>
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        textAlign: "center",
                        mt: 3,
                        "@keyframes fadeIn": {
                          "0%": {
                            opacity: 0,
                          },
                          "100%": {
                            opacity: 1,
                          },
                        },
                        animation: "fadeIn 0.6s ease-out 1.1s forwards",
                        opacity: 0,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        By continuing, you agree to KanchanDeepJyot's{" "}
                        <Link to="/privacy-policy" style={{ textDecoration: "none", color: "#8a4baf" }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Login
