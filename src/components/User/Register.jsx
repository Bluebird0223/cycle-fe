"use client"

import React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
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
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  LinearProgress,
  Chip,
  Fade,
  Zoom,
  Slide,
  alpha,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import LockIcon from "@mui/icons-material/Lock"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import SecurityIcon from "@mui/icons-material/Security"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"

import BackdropLoader from "../Layouts/BackdropLoader"
import MetaData from "../Layouts/MetaData"
import publicCommunication from "../../service/publicCommunication"
import { setCookie } from "cookies-next"
import { clearErrors, registerFail, registerRequest, registerSuccess } from "../../store/userSlice"

// Enhanced theme with better color palette and typography
const theme = createTheme({
  palette: {
    primary: {
      main: "#8a4baf",
      light: "#a56cc4",
      dark: "#6a3b8a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6a5fea",
      light: "#8b7ff0",
      dark: "#5a4fda",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      letterSpacing: "-0.025em",
      "@media (max-width:600px)": {
        fontSize: "1.875rem",
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.3,
      letterSpacing: "-0.015em",
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      "@media (max-width:600px)": {
        fontSize: "0.875rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
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
          fontSize: "0.95rem",
          padding: "12px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },
  },
})

// Enhanced floating shapes with better performance
const FloatingShapes = React.memo(() => {
  const shapes = useMemo(() => [...Array(12)], [])

  return (
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
      {shapes.map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "20%" : "0%",
            background: `linear-gradient(${45 + i * 30}deg, 
              rgba(138, 75, 175, ${0.05 + (i % 3) * 0.03}), 
              rgba(106, 95, 234, ${0.05 + (i % 3) * 0.03}))`,
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0px) rotate(0deg) scale(1)",
              },
              "33%": {
                transform: `translateY(-${15 + i * 2}px) rotate(120deg) scale(1.1)`,
              },
              "66%": {
                transform: `translateY(-${10 + i}px) rotate(240deg) scale(0.9)`,
              },
            },
            animation: `float ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            width: {
              xs: `${25 + i * 8}px`,
              sm: `${40 + i * 12}px`,
            },
            height: {
              xs: `${25 + i * 8}px`,
              sm: `${40 + i * 12}px`,
            },
            left: `${(i * 8.33) % 100}%`,
            top: `${(i * 12.5) % 100}%`,
            display: { xs: i > 6 ? "none" : "block", sm: "block" },
          }}
        />
      ))}
    </Box>
  )
})

// Enhanced password strength checker with better UX
const PasswordStrengthMeter = React.memo(({ password }) => {
  const getPasswordStrength = useCallback((password) => {
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    Object.values(checks).forEach((check) => {
      if (check) score += 1
    })

    return { score, checks }
  }, [])

  const { score, checks } = useMemo(() => getPasswordStrength(password), [password, getPasswordStrength])
  const strength = score <= 2 ? "weak" : score <= 4 ? "medium" : "strong"
  const color = strength === "weak" ? "error" : strength === "medium" ? "warning" : "success"

  if (!password) return null

  return (
    <Fade in={!!password} timeout={300}>
      <Box sx={{ mt: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <SecurityIcon sx={{ fontSize: 16, mr: 1, color: `${color}.main` }} />
          <Typography variant="caption" sx={{ mr: 1, fontWeight: 500 }}>
            Password strength:
          </Typography>
          <Chip
            label={strength.toUpperCase()}
            size="small"
            color={color}
            sx={{
              fontSize: "0.7rem",
              height: "22px",
              fontWeight: 600,
              boxShadow: `0 2px 4px ${alpha(theme.palette[color].main, 0.3)}`,
            }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={(score / 5) * 100}
          color={color}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette[color].main, 0.1),
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
            },
          }}
        />
        <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {Object.entries(checks).map(([key, passed]) => (
            <Zoom
              key={key}
              in={true}
              timeout={300}
              style={{ transitionDelay: `${Object.keys(checks).indexOf(key) * 100}ms` }}
            >
              <Chip
                size="small"
                icon={passed ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <CancelIcon sx={{ fontSize: 14 }} />}
                label={
                  key === "length"
                    ? "8+ chars"
                    : key === "lowercase"
                      ? "lowercase"
                      : key === "uppercase"
                        ? "uppercase"
                        : key === "number"
                          ? "number"
                          : "special char"
                }
                color={passed ? "success" : "default"}
                variant={passed ? "filled" : "outlined"}
                sx={{
                  fontSize: "0.7rem",
                  height: "24px",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  ...(passed && {
                    boxShadow: `0 2px 4px ${alpha(theme.palette.success.main, 0.3)}`,
                  }),
                }}
              />
            </Zoom>
          ))}
        </Box>
      </Box>
    </Fade>
  )
})

// Enhanced animated input with better accessibility
const AnimatedInput = React.memo(
  ({
    id,
    label,
    type,
    name,
    value,
    onChange,
    required,
    icon,
    endAdornment,
    animationDelay,
    autoComplete,
    fullWidth = true,
    error,
    helperText,
  }) => {
    const [focused, setFocused] = useState(false)
    const [touched, setTouched] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    useEffect(() => {
      setHasValue(value !== "")
    }, [value])

    const handleChange = useCallback(
      (e) => {
        onChange(e)
        if (!touched) setTouched(true)
      },
      [onChange, touched],
    )

    return (
      <Slide direction="up" in={true} timeout={600} style={{ transitionDelay: `${animationDelay * 1000}ms` }}>
        <Box
          sx={{
            position: "relative",
            mb: 3,
            width: fullWidth ? "100%" : "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              transformOrigin: "left",
              transform: "scaleX(0)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              ...(focused && {
                transform: "scaleX(1)",
              }),
              zIndex: 2,
              borderRadius: "3px",
            }}
          />

          <TextField
            fullWidth={fullWidth}
            id={id}
            label={label}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            autoComplete={autoComplete}
            error={error || (touched && !hasValue && required)}
            helperText={helperText || (touched && !hasValue && required && `${label} is required`)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: { xs: "56px", sm: "60px" },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: "2px",
                  },
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(255,255,255,1)",
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: "2px",
                    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                },
                "& fieldset": {
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputLabel-root": {
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontWeight: 500,
                "&.Mui-focused": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              },
            }}
            InputProps={{
              startAdornment: icon && (
                <InputAdornment position="start">
                  {React.cloneElement(icon, {
                    sx: {
                      color: focused ? theme.palette.primary.main : "text.secondary",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: focused ? "scale(1.1)" : "scale(1)",
                    },
                  })}
                </InputAdornment>
              ),
              endAdornment: endAdornment,
            }}
          />
        </Box>
      </Slide>
    )
  },
)

// Enhanced avatar upload with better UX
const AvatarUpload = React.memo(({ avatarPreview, onAvatarChange, animationDelay }) => {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragOver(false)
      const files = e.dataTransfer.files
      if (files.length > 0) {
        const file = files[0]
        if (file.type.startsWith("image/")) {
          setUploading(true)
          const event = { target: { name: "avatar", files: [file] } }
          onAvatarChange(event)
          setTimeout(() => setUploading(false), 1000)
        }
      }
    },
    [onAvatarChange],
  )

  const handleFileChange = useCallback(
    (e) => {
      setUploading(true)
      onAvatarChange(e)
      setTimeout(() => setUploading(false), 1000)
    },
    [onAvatarChange],
  )

  return (
    <Slide direction="up" in={true} timeout={600} style={{ transitionDelay: `${animationDelay * 1000}ms` }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 2, fontWeight: 600, display: "flex", alignItems: "center" }}>
          <PhotoCameraIcon sx={{ mr: 1, fontSize: 18 }} />
          Profile Picture
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={avatarPreview}
              sx={{
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                border: "4px solid",
                borderColor: "primary.main",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
              }}
            />
            {uploading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: "50%",
                }}
              >
                <CircularProgress size={30} sx={{ color: "white" }} />
              </Box>
            )}
          </Box>

          <Box
            component="label"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              flex: 1,
              minHeight: "100px",
              border: "2px dashed",
              borderColor: dragOver ? "primary.main" : "grey.300",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backgroundColor: dragOver ? alpha(theme.palette.primary.main, 0.08) : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: "translateY(-2px)",
                boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
              },
              p: 3,
            }}
          >
            <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main", mb: 1.5 }} />
            <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500 }}>
              Drop your image here or{" "}
              <Typography component="span" color="primary" fontWeight={700}>
                browse
              </Typography>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              PNG, JPG up to 5MB
            </Typography>
          </Box>
        </Box>
      </Box>
    </Slide>
  )
})

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const { loading, isAuthenticated, error } = useSelector((state) => state.user)

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    cpassword: "",
  })

  const { name, email, gender, password, cpassword } = user

  const [avatar, setAvatar] = useState()
  const [avatarFile, setAvatarFile] = useState()
  const [avatarPreview, setAvatarPreview] = useState("/placeholder.svg?height=100&width=100")
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  })
  const [localLoading, setLocalLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const handleTogglePasswordVisibility = useCallback((field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }, [])

  const validateForm = useCallback(() => {
    const errors = {}

    if (!name.trim()) errors.name = "Full name is required"
    if (!email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid"
    if (!gender) errors.gender = "Please select a gender"
    if (!password) errors.password = "Password is required"
    else if (password.length < 8) errors.password = "Password must be at least 8 characters"
    if (!cpassword) errors.cpassword = "Please confirm your password"
    else if (password !== cpassword) errors.cpassword = "Passwords don't match"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [name, email, gender, password, cpassword])

  const handleDataChange = useCallback(
    (e) => {
      if (e.target.name === "avatar") {
        const file = e.target.files[0]
        if (file) {
          // Validate file size (5MB limit)
          if (file.size > 5 * 1024 * 1024) {
            enqueueSnackbar("File size must be less than 5MB", { variant: "error" })
            return
          }

          const reader = new FileReader()
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result)
              setAvatar(reader.result)
              setAvatarFile(file)
              setFormErrors((prev) => ({ ...prev, avatar: null }))
            }
          }
          reader.readAsDataURL(file)
        }
      } else {
        setUser({ ...user, [e.target.name]: e.target.value })
        // Clear field error when user starts typing
        if (formErrors[e.target.name]) {
          setFormErrors((prev) => ({ ...prev, [e.target.name]: null }))
        }
      }
    },
    [user, formErrors, enqueueSnackbar],
  )

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault()

      if (!validateForm()) {
        enqueueSnackbar("Please fix the errors below", { variant: "error" })
        return
      }

      setLocalLoading(true)

      const formData = new FormData()
      formData.append("name", name.trim())
      formData.append("email", email.trim().toLowerCase())
      formData.append("gender", gender)
      formData.append("password", password)

      try {
        dispatch(registerRequest())
        const serverResponse = await publicCommunication?.registerUser(formData)

        if (serverResponse?.data?.success === true) {
          dispatch(registerSuccess(serverResponse?.data?.user))
          setCookie(process.env.REACT_APP_TOKENNAME, serverResponse?.data?.token)
          setCookie(process.env.REACT_APP_USERDETAILS, serverResponse?.data?.user)
          enqueueSnackbar("Registration Successful! Welcome aboard! 🎉", { variant: "success" })
          navigate("/")
        } else {
          const errorMessage = serverResponse?.data?.message || "Something went wrong!"
          dispatch(registerFail(errorMessage))
          enqueueSnackbar(errorMessage, { variant: "warning" })
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error?.message || "Registration Failed!"
        dispatch(registerFail(errorMessage))
        enqueueSnackbar(errorMessage, { variant: "error" })
      } finally {
        setLocalLoading(false)
      }
    },
    [validateForm, name, email, gender, password, dispatch, enqueueSnackbar, navigate],
  )

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" })
      dispatch(clearErrors())
    }
    if (isAuthenticated) {
      navigate("/")
    }
  }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar])

  return (
    <ThemeProvider theme={theme}>
      <MetaData title="Register | KanchanDeepJyot" />

      {loading && <BackdropLoader />}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          background: `
            radial-gradient(circle at 20% 80%, rgba(138, 75, 175, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(106, 95, 234, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, #f8fafc 0%, #f1f5f9 20%, #e2e8f0 40%, #f8fafc 60%, #f1f5f9 80%, #f8fafc 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 600% 600%",
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
          animation: "gradientShift 20s ease infinite",
          padding: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FloatingShapes />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Zoom in={true} timeout={800}>
            <Paper
              elevation={0}
              sx={{
                overflow: "hidden",
                borderRadius: { xs: 4, sm: 5 },
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: `
                  0 25px 50px -12px rgba(138, 75, 175, 0.15),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                "@keyframes paperFloat": {
                  "0%, 100%": {
                    transform: "translateY(0px)",
                  },
                  "50%": {
                    transform: "translateY(-3px)",
                  },
                },
                animation: "paperFloat 8s ease-in-out infinite",
              }}
            >
              <Grid container sx={{ minHeight: { md: "700px" } }}>
                {/* Left Column - Enhanced Decorative */}
                <Grid
                  item
                  xs={0}
                  md={5}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    position: "relative",
                    background: `
                      linear-gradient(135deg, #8a4baf 0%, #6a5fea 30%, #8b5cf6 60%, #a855f7 100%),
                      radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)
                    `,
                    padding: { md: 4, lg: 5 },
                    color: "white",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    overflow: "hidden",
                  }}
                >
                  {/* Enhanced background pattern */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0.08,
                      background: `
                        radial-gradient(circle at 25% 25%, white 3px, transparent 3px),
                        radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
                        linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
                      `,
                      backgroundSize: "40px 40px, 25px 25px, 100% 100%",
                      "@keyframes patternMove": {
                        "0%": {
                          transform: "translate(0, 0) rotate(0deg)",
                        },
                        "100%": {
                          transform: "translate(15px, 15px) rotate(360deg)",
                        },
                      },
                      animation: "patternMove 30s linear infinite",
                    }}
                  />

                  <Fade in={true} timeout={1000}>
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                          mb: 2,
                          background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          "@keyframes textGlow": {
                            "0%, 100%": {
                              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                            },
                            "50%": {
                              filter: "drop-shadow(0 0 16px rgba(255,255,255,0.6))",
                            },
                          },
                          animation: "textGlow 4s ease-in-out infinite",
                        }}
                      >
                        Join Our Community
                      </Typography>
                      <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.95)", lineHeight: 1.7 }}>
                        Create your account to unlock exclusive features, personalized experiences, and connect with
                        like-minded individuals in our growing community.
                      </Typography>
                    </Box>
                  </Fade>

                  <Slide direction="up" in={true} timeout={1200}>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 40,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        padding: "0 40px",
                      }}
                    >
                      <Box
                        component="img"
                        src="/placeholder.svg?height=60&width=200"
                        alt="KanchanDeep Logo"
                        sx={{
                          maxWidth: "200px",
                          height: "auto",
                          filter: "brightness(0) invert(1) drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                          "@keyframes logoFloat": {
                            "0%, 100%": {
                              transform: "translateY(0px)",
                            },
                            "50%": {
                              transform: "translateY(-8px)",
                            },
                          },
                          animation: "logoFloat 5s ease-in-out infinite",
                        }}
                      />
                    </Box>
                  </Slide>
                </Grid>

                {/* Right Column - Enhanced Form */}
                <Grid item xs={12} md={7}>
                  <Box
                    sx={{
                      p: { xs: 3, sm: 4, md: 5 },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: { md: "700px" },
                      justifyContent: "center",
                    }}
                  >
                    {/* Mobile logo */}
                    {isMobile && (
                      <Fade in={true} timeout={800}>
                        <Box sx={{ width: "100px", height: "100px", mb: 3 }}>
                          <Box
                            component="img"
                            src="/placeholder.svg?height=100&width=100"
                            alt="KanchanDeep Logo"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      </Fade>
                    )}

                    <Zoom in={true} timeout={600}>
                      <Box
                        sx={{
                          mb: 2,
                          p: 2,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}
                      >
                        <PersonIcon sx={{ color: "white", fontSize: 32 }} />
                      </Box>
                    </Zoom>

                    <Fade in={true} timeout={800}>
                      <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                          Create Your Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Join thousands of users who trust our platform
                        </Typography>
                      </Box>
                    </Fade>

                    <Box
                      component="form"
                      onSubmit={handleRegister}
                      encType="multipart/form-data"
                      sx={{ width: "100%", maxWidth: "520px" }}
                    >
                      {/* Name and Email Row */}
                      <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={12} sm={6}>
                          <AnimatedInput
                            id="name"
                            label="Full Name"
                            name="name"
                            value={name}
                            onChange={handleDataChange}
                            required
                            icon={<PersonIcon />}
                            animationDelay={0.1}
                            autoComplete="name"
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <AnimatedInput
                            id="email"
                            label="Email Address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleDataChange}
                            required
                            icon={<EmailIcon />}
                            animationDelay={0.2}
                            autoComplete="email"
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                          />
                        </Grid>
                      </Grid>

                      {/* Gender Selection */}
                      <Slide direction="up" in={true} timeout={600} style={{ transitionDelay: "300ms" }}>
                        <Box sx={{ mb: 3 }}>
                          <FormControl component="fieldset" error={!!formErrors.gender}>
                            <FormLabel
                              component="legend"
                              sx={{
                                color: "text.primary",
                                fontWeight: 600,
                                mb: 1.5,
                                "&.Mui-focused": {
                                  color: "primary.main",
                                },
                              }}
                            >
                              Gender
                            </FormLabel>
                            <RadioGroup
                              row
                              name="gender"
                              value={gender}
                              onChange={handleDataChange}
                              sx={{
                                "& .MuiFormControlLabel-root": {
                                  mr: 4,
                                  "& .MuiRadio-root": {
                                    color: "primary.main",
                                    "&.Mui-checked": {
                                      color: "primary.main",
                                    },
                                  },
                                  "& .MuiFormControlLabel-label": {
                                    fontWeight: 500,
                                  },
                                },
                              }}
                            >
                              <FormControlLabel value="male" control={<Radio required />} label="Male" />
                              <FormControlLabel value="female" control={<Radio required />} label="Female" />
                              <FormControlLabel value="other" control={<Radio required />} label="Other" />
                            </RadioGroup>
                            {formErrors.gender && (
                              <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                {formErrors.gender}
                              </Typography>
                            )}
                          </FormControl>
                        </Box>
                      </Slide>

                      {/* Password Fields */}
                      <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={12} sm={6}>
                          <AnimatedInput
                            id="password"
                            label="Password"
                            type={showPassword.password ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleDataChange}
                            required
                            icon={<LockIcon />}
                            animationDelay={0.4}
                            autoComplete="new-password"
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => handleTogglePasswordVisibility("password")}
                                  edge="end"
                                  aria-label="toggle password visibility"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <PasswordStrengthMeter password={password} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <AnimatedInput
                            id="cpassword"
                            label="Confirm Password"
                            type={showPassword.cpassword ? "text" : "password"}
                            name="cpassword"
                            value={cpassword}
                            onChange={handleDataChange}
                            required
                            icon={<LockIcon />}
                            animationDelay={0.5}
                            autoComplete="new-password"
                            error={!!formErrors.cpassword}
                            helperText={formErrors.cpassword}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => handleTogglePasswordVisibility("cpassword")}
                                  edge="end"
                                  aria-label="toggle password visibility"
                                  sx={{
                                    "&:hover": {
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  {showPassword.cpassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </Grid>
                      </Grid>

                      {/* Avatar Upload */}
                      <AvatarUpload
                        avatarPreview={avatarPreview}
                        onAvatarChange={handleDataChange}
                        animationDelay={0.6}
                      />
                      {formErrors.avatar && (
                        <Typography variant="caption" color="error" sx={{ mt: -2, mb: 2, display: "block" }}>
                          {formErrors.avatar}
                        </Typography>
                      )}

                      {/* Submit Button */}
                      <Slide direction="up" in={true} timeout={600} style={{ transitionDelay: "700ms" }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={localLoading}
                          sx={{
                            height: 56,
                            mb: 3,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            "&:hover": {
                              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                              transform: "translateY(-2px)",
                              boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                            },
                            "&:active": {
                              transform: "translateY(0px)",
                            },
                            fontSize: "1rem",
                            fontWeight: 600,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          {localLoading ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                              Creating account...
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
                              Create Account
                              <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
                            </Box>
                          )}
                        </Button>
                      </Slide>

                      {/* Login Link */}
                      <Fade in={true} timeout={800} style={{ transitionDelay: "800ms" }}>
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Already have an account?{" "}
                            <Link to="/login" style={{ textDecoration: "none" }}>
                              <Typography
                                component="span"
                                variant="body2"
                                color="primary.main"
                                sx={{
                                  fontWeight: 600,
                                  position: "relative",
                                  "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -2,
                                    left: 0,
                                    width: "100%",
                                    height: "2px",
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    transformOrigin: "left",
                                    transform: "scaleX(0)",
                                    transition: "transform 0.3s ease",
                                  },
                                  "&:hover::after": {
                                    transform: "scaleX(1)",
                                  },
                                }}
                              >
                                Sign in here
                              </Typography>
                            </Link>
                          </Typography>
                        </Box>
                      </Fade>

                      {/* Terms */}
                      <Fade in={true} timeout={800} style={{ transitionDelay: "900ms" }}>
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                            By creating an account, you agree to our{" "}
                            <Link to="/terms" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy-policy"
                              style={{ textDecoration: "none", color: theme.palette.primary.main }}
                            >
                              Privacy Policy
                            </Link>
                          </Typography>
                        </Box>
                      </Fade>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Zoom>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Register
