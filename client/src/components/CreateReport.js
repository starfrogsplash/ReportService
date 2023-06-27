import { useState } from 'react';
import { Card, CardContent, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReport = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState('');

  const handleCreateReport = async () => {
    const report = {
      title,
      description,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      data: metrics
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3001/report', report, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })

      if(response.status === 201 ){
        navigate('/user-reports');
      }

    } catch (error) {
      setError(error.response.data.message);
    }

  }

  const handleAddMetric = () => {
    const newMetric = {
      description: '',
      metricId: '',
      type: '',
      value: ''
    };
    setMetrics([...metrics, newMetric]);
  }

  const handleMetricChange = (index, field, value) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
  }

  const handleRemoveMetric = (index) => {
    const newMetrics = [...metrics];
    newMetrics.splice(index, 1);
    setMetrics(newMetrics);
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <Paper sx={{ padding: '16px', backgroundColor: '#F5F5F5' }}>
      <Card sx={{ marginBottom: '16px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Title:
          </Typography>
          <TextField value={title} onChange={(event) => setTitle(event.target.value)} />
          <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1, marginTop: '8px' }}>
            <b>Description:</b>
          </Typography>
          <TextField value={description} onChange={(event) => setDescription(event.target.value)} />
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Metrics:
      </Typography>
      {metrics.map((metric, index) => (
        <Card key={index} sx={{ marginBottom: '16px' }}>
          <CardContent >
            <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1, marginTop: '8px' }} fontWeight="bold">
              metricId:
            </Typography>
            <TextField value={metric.metricId} onChange={(event) => handleMetricChange(index, 'metricId', event.target.value)} />
            <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1, marginTop: '8px' }} fontWeight="bold">
              Description:
            </Typography>
            <TextField value={metric.description} onChange={(event) => handleMetricChange(index, 'description', event.target.value)} />
            <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1, marginTop: '8px' }} fontWeight="bold">
              Type:
            </Typography>
            <TextField value={metric.type} onChange={(event) => handleMetricChange(index, 'type', event.target.value)} />
            <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1, marginTop: '8px' }} fontWeight="bold">
              Value:
            </Typography>
            <TextField value={metric.value} onChange={(event) => handleMetricChange(index, 'value', event.target.value)} />
          </CardContent>
          <Button sx={{ marginBottom: '16px' }} color='error' variant="contained" onClick={() => handleRemoveMetric(index)}>Remove Metric</Button>
        </Card>
      ))}
      <Button sx={{ mr: '8px' }} variant="contained" onClick={handleAddMetric}>Add Metric</Button>
      <Button sx={{ mr: '8px' }} color='success' variant="contained" onClick={handleCreateReport}>Submit</Button>
    </Paper>
  );
};

export default CreateReport;
