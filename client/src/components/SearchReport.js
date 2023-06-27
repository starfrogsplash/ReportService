
import { Card, CardContent, Grid, Paper, Typography, Button, Input, Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'

const SearchReport = () => {
  const [report, setReport] = useState({});
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/report/${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      const { uuid, report } = response.data;
      setReport({ uuid, ...report })
      setSearchValue('')
    } catch (error) {
      setError(error.response.data.message);
      setReport({});
    }
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Input type="text" value={searchValue} onChange={handleInputChange} />
        <Button onClick={handleSearchReport} disabled={!searchValue} variant="contained">Search</Button>
      </Box>
      {report.uuid && (
        <Grid item key={report.uuid} xs={12} sm={6} md={4}>
          <Paper key={report.uuid} sx={{ padding: '40px', backgroundColor: '#F5F5F5' }}>
            <Card sx={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {report.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <b>UUID:</b> {report.uuid}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                  <b>Description:</b> {report.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                  <b>Created:</b> {report.created}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                  <b>Updated:</b> {report.updated}
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Metrics:
            </Typography>
            {report.data.map((item) => (
              <Card key={item.metricId} sx={{ marginBottom: '16px' }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                    <b>metricId:</b> {item.metricId}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                    <b>Description:</b> {item.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                    <b>Type:</b> {item.type}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
                    <b>Value:</b> {item.value}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      )}
      {error && <Typography variant="h6">Error: {error}</Typography>}
    </>
  )
};

export default SearchReport;
