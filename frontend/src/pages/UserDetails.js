import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert,
  useTheme,
  Avatar,
  Fade,
  Zoom,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  MoreVert,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import { UserCardSkeleton } from '../components/SkeletonLoader';

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.getUser(id);
      setUser(response.data.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userAPI.deleteUser(id);
        toast.success('User deleted successfully');
        navigate('/users');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleBack = () => {
    navigate('/users');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <UserCardSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Box display="flex" alignItems="center" mb={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Back to Users
          </Button>
        </Box>
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box>
        <Box display="flex" alignItems="center" mb={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Back to Users
          </Button>
        </Box>
        <Alert severity="warning">
          User not found
        </Alert>
      </Box>
    );
  }

  return (
    <Fade in timeout={600}>
      <Box>
        <Box display="flex" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            variant="outlined"
            sx={{ minWidth: 140 }}
          >
            Back to Users
          </Button>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }} fontWeight="bold">
            User Details
          </Typography>
          <Box display="flex" gap={1}>
            <Tooltip title="Edit User">
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEdit}
                color="primary"
                sx={{ minWidth: 100 }}
              >
                Edit
              </Button>
            </Tooltip>
            <Tooltip title="Delete User">
              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={handleDelete}
                color="error"
                sx={{ minWidth: 100 }}
              >
                Delete
              </Button>
            </Tooltip>
          </Box>
        </Box>

      <Grid container spacing={3}>
        {/* User Profile Card */}
        <Grid item xs={12} md={4}>
          <Zoom in timeout={400}>
            <Card 
              sx={{ 
                height: 'fit-content',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  pointerEvents: 'none',
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4, position: 'relative', zIndex: 1 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto 24px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '3px solid rgba(255,255,255,0.3)',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                
                <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 1 }}>
                  {user.name}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  {user.email}
                </Typography>
                
                <Chip
                  label="Active User"
                  sx={{ 
                    mb: 3,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
                
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
                
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Member since {formatDate(user.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>

        {/* User Information Card */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={800}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Typography variant="h5" component="h3" fontWeight="bold">
                    Contact Information
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      p={2}
                      sx={{
                        backgroundColor: theme.palette.primary[50],
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: theme.palette.primary[200],
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        <Email fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="500">
                          Email Address
                        </Typography>
                        <Typography variant="body1" fontWeight="600" color="primary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      p={2}
                      sx={{
                        backgroundColor: theme.palette.secondary[50],
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: theme.palette.secondary[200],
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.secondary.main,
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        <Phone fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="500">
                          Phone Number
                        </Typography>
                        <Typography variant="body1" fontWeight="600">
                          {user.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box 
                      display="flex" 
                      alignItems="flex-start" 
                      p={2}
                      sx={{
                        backgroundColor: theme.palette.success[50],
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: theme.palette.success[200],
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.success.main,
                          color: 'white',
                          mr: 2,
                          mt: 0.5,
                        }}
                      >
                        <LocationOn fontSize="small" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight="500" gutterBottom>
                          Address
                        </Typography>
                        <Typography variant="body1" fontWeight="600">
                          {user.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                  Account Information
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      p={2}
                      sx={{
                        backgroundColor: theme.palette.warning[50],
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: theme.palette.warning[200],
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.warning.main,
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        <CalendarToday fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="500">
                          Created At
                        </Typography>
                        <Typography variant="body1" fontWeight="600">
                          {formatDate(user.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      p={2}
                      sx={{
                        backgroundColor: theme.palette.info[50] || theme.palette.grey[50],
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: theme.palette.info[200] || theme.palette.grey[200],
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.info?.main || theme.palette.primary.main,
                          color: 'white',
                          mr: 2,
                        }}
                      >
                        <CalendarToday fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="500">
                          Last Updated
                        </Typography>
                        <Typography variant="body1" fontWeight="600">
                          {formatDate(user.updatedAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
    </Fade>
  );
};

export default UserDetails;
