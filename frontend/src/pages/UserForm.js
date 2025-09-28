import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  Card,
  CardContent,
  Divider,
  InputAdornment,
} from '@mui/material';
import { 
  ArrowBack, 
  Save, 
  Person, 
  Email, 
  Phone, 
  LocationOn,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import { FormSkeleton } from '../components/SkeletonLoader';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUser = async () => {
    try {
      setFetching(true);
      const response = await userAPI.getUser(id);
      setFormData(response.data.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch user details');
    } finally {
      setFetching(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      errors.name = 'Name cannot exceed 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters long';
    } else if (formData.address.trim().length > 200) {
      errors.address = 'Address cannot exceed 200 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      };

      if (isEdit) {
        await userAPI.updateUser(id, userData);
        toast.success('User updated successfully');
      } else {
        await userAPI.createUser(userData);
        toast.success('User created successfully');
      }

      navigate('/users');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/users');
  };

  if (fetching) {
    return <FormSkeleton />;
  }

  return (
    <Fade in timeout={600}>
      <Box>
        <Box display="flex" alignItems="center" mb={4}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            variant="outlined"
            sx={{ mr: 2, minWidth: 140 }}
          >
            Back to Users
          </Button>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {isEdit ? 'Edit User' : 'Add New User'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isEdit ? 'Update user information' : 'Create a new user account'}
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            icon={<Error />}
          >
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  User Information
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.name)}
                        helperText={formErrors.name}
                        required
                        disabled={loading}
                        inputProps={{ maxLength: 50 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color={formErrors.name ? 'error' : 'primary'} />
                            </InputAdornment>
                          ),
                          endAdornment: !formErrors.name && formData.name && (
                            <InputAdornment position="end">
                              <CheckCircle color="success" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email}
                        required
                        disabled={loading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color={formErrors.email ? 'error' : 'primary'} />
                            </InputAdornment>
                          ),
                          endAdornment: !formErrors.email && formData.email && (
                            <InputAdornment position="end">
                              <CheckCircle color="success" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.phone)}
                        helperText={formErrors.phone || 'Enter phone number with country code (e.g., +1234567890)'}
                        required
                        disabled={loading}
                        placeholder="+1234567890"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color={formErrors.phone ? 'error' : 'primary'} />
                            </InputAdornment>
                          ),
                          endAdornment: !formErrors.phone && formData.phone && (
                            <InputAdornment position="end">
                              <CheckCircle color="success" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.address)}
                        helperText={formErrors.address}
                        required
                        disabled={loading}
                        multiline
                        rows={3}
                        inputProps={{ maxLength: 200 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                              <LocationOn color={formErrors.address ? 'error' : 'primary'} />
                            </InputAdornment>
                          ),
                          endAdornment: !formErrors.address && formData.address && (
                            <InputAdornment position="end" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                              <CheckCircle color="success" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" gap={2} justifyContent="flex-end" flexWrap="wrap">
                        <Button
                          variant="outlined"
                          onClick={handleBack}
                          disabled={loading}
                          size={isMobile ? 'medium' : 'large'}
                          sx={{ minWidth: 120 }}
                        >
                          Cancel
                        </Button>
                        <Zoom in timeout={300}>
                          <Button
                            type="submit"
                            variant="contained"
                            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                            disabled={loading}
                            size={isMobile ? 'medium' : 'large'}
                            sx={{ minWidth: 160 }}
                          >
                            {loading ? 'Saving...' : (isEdit ? 'Update User' : 'Create User')}
                          </Button>
                        </Zoom>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                  Form Guidelines
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Name must be 2-50 characters
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Email must be valid format
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Phone with country code
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Address 5-200 characters
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  All fields are required. Make sure to provide accurate information.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default UserForm;
