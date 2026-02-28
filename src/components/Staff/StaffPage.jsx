import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { UserCard } from '../shared/userCard/UserCard';
import { useGetStaffQuery, useAddUserMutation } from '../../redux/api/apiSlice';
import AddUser from './AddUser';
import { PersonAdd } from '@mui/icons-material';
import { createUserPayloadValidator } from './validator';
import { CardsSkeleton } from './skeleton';
import ContentLoader from "react-content-loader";

const StaffPage = () => {
  const { data: staff = [], isLoading: fetching } = useGetStaffQuery();
  const [addUser] = useAddUserMutation();
  
  const [showAdd, setShowAdd] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [addError, setAddError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const toggleAdd = () => {
    setShowAdd((prev) => !prev);
    setFormData({ first_name: '', last_name: '', email: '', phone_number: '', password: '' });
    setSubmitDisabled(true);
    setAddError('');
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    const error = await createUserPayloadValidator(newFormData);
    setSubmitDisabled(!!error);
    setAddError(error);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await addUser(formData).unwrap();
      toggleAdd();
    } catch (err) {
      setAddError(err?.data?.message || 'Failed to add user');
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#A2302F",
            mb: 1,
          }}
        >
          Staff Management
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
          }}
        >
          Manage your team members and staff details.
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <PersonAdd
          onClick={toggleAdd}
          sx={{
            width: 40,
            height: 40,
            cursor: 'pointer',
            color: '#A2302F',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
          title="Add User"
        />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {fetching ? (
          <ContentLoader
            style={{ width: "100%", margin: "0px", height: "360" }}
          >
            <CardsSkeleton />
          </ContentLoader>
        ) : staff.map(user => (
          <Box key={user.id} sx={{ flex: '0 1 calc(25% - 8px)', minWidth: 250 }}>
            <UserCard
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
              phone_number={user.phone_number}
            />
          </Box>
        ))}
      </Box>
      {showAdd ? (
        <AddUser
          submitting={submitting}
          error={addError}
          submitDisabled={submitDisabled}
          title="Add new User"
          first_name={formData.first_name}
          last_name={formData.last_name}
          email={formData.email}
          phone_number={formData.phone_number}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          toggleAdd={toggleAdd}
        />
      ) : null}
    </Container>
  );
};

export default StaffPage;
