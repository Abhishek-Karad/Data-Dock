import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  FileDownload,
  Refresh,
  Person,
  Group,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';

const UserList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [, setTotalPages] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });

  const fetchUsers = async (pageNum = page + 1, limit = rowsPerPage, search = searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.getUsers(pageNum, limit, search);
      const { users: userData, pagination } = response.data.data;
      
      setUsers(userData);
      setTotalUsers(pagination.totalUsers);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(0);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchUsers(1, rowsPerPage, value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (userId) => {
    try {
      await userAPI.deleteUser(userId);
      toast.success('User deleted successfully');
      setDeleteDialog({ open: false, user: null });
      fetchUsers();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const handleExport = async () => {
    try {
      const response = await userAPI.exportUsers();
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Users exported successfully');
    } catch (err) {
      toast.error('Failed to export users');
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  if (loading && users.length === 0) {
    return (
      <Box>
        <Box display="flex" alignItems="center" mb={3}>
          <SkeletonLoader variant="text" width="40%" height={48} />
        </Box>
        <Paper sx={{ p: 2, mb: 2 }}>
          <SkeletonLoader variant="rectangular" width="100%" height={56} />
        </Paper>
        <Paper>
          <SkeletonLoader rows={5} columns={isMobile ? 3 : 5} />
        </Paper>
      </Box>
    );
  }

  return (
    <Fade in timeout={600}>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
             Your one stop solution to manage your users
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Developed to ease life
            </Typography>
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Group color="primary" />
              <Typography variant="h6" fontWeight="600">
                {totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                users
              </Typography>
            </Box>
          </Box>
        </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2} justifyContent="flex-end" flexWrap="wrap">
              <Tooltip title="Refresh user list">
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleRefresh}
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  Refresh
                </Button>
              </Tooltip>
              <Tooltip title="Export all users to CSV">
                <Button
                  variant="outlined"
                  startIcon={<FileDownload />}
                  onClick={handleExport}
                  disabled={loading || users.length === 0}
                  sx={{ minWidth: 120 }}
                >
                  Export CSV
                </Button>
              </Tooltip>
              <Zoom in timeout={300}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/users/new')}
                  sx={{ minWidth: 140 }}
                >
                  Add User
                </Button>
              </Zoom>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  Contact
                </TableCell>
                {!isMobile && (
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Phone
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                    Address
                  </TableCell>
                )}
                <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 3 : 5} align="center" sx={{ py: 8 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                      <Person sx={{ fontSize: 64, color: theme.palette.grey[400] }} />
                      <Typography variant="h6" color="text.secondary">
                        {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                      </Typography>
                      {!searchTerm && (
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={() => navigate('/users/new')}
                          sx={{ mt: 1 }}
                        >
                          Add Your First User
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <Fade in timeout={300 + index * 100} key={user._id}>
                    <TableRow 
                      hover 
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: theme.palette.primary[50] + '20',
                          transform: 'scale(1.01)',
                          transition: 'all 0.2s ease-in-out'
                        }
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              backgroundColor: theme.palette.primary.main,
                              width: 40,
                              height: 40,
                              fontSize: '1rem',
                              fontWeight: 600,
                            }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="600">
                              {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {user._id.slice(-6)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="primary" fontWeight="500">
                          {user.email}
                        </Typography>
                      </TableCell>
                      {!isMobile && (
                        <TableCell>
                          <Typography variant="body2">
                            {user.phone}
                          </Typography>
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                            {user.address}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <Box display="flex" gap={1} justifyContent="center">
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => navigate(`/users/${user._id}`)}
                              sx={{
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.main + '20',
                                }
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit User">
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => navigate(`/users/${user._id}/edit`)}
                              sx={{
                                '&:hover': {
                                  backgroundColor: theme.palette.secondary.main + '20',
                                }
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteDialog({ open: true, user })}
                              sx={{
                                '&:hover': {
                                  backgroundColor: theme.palette.error.main + '20',
                                }
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </Fade>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Users per page:"
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, user: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user "{deleteDialog.user?.name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, user: null })}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteDialog.user._id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Fade>
  );
};

export default UserList;
