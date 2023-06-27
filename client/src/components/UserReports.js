import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import UserPreviewReport from './UserPreviewReport'

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/reports/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setReports(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReports();
  }, []);

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (reports.length === 0) {
    return <Typography>No reports found. Why not create a report?</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {reports.map((report) => (
          <UserPreviewReport key={report.uuid} report={report} />
      ))}
    </Grid>
  );
};

export default UserReports;
