
import { Card, CardContent, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'

const UserPreviewReport = ({ report }) => {
  return (
    <Grid item key={report.uuid} xs={12} sm={6} md={4}>
      <Paper key={report.uuid} sx={{ padding: '25px', backgroundColor: '#F5F5F5' }}>
        <Card sx={{ marginBottom: '16px', height: '12rem' }}>
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
            ........
          </CardContent>
        </Card>
        <Link to={`/report/${report.uuid}`} state={{ report: report }} style={{ textDecoration: 'none' }} >
          <Button variant="contained" color="primary">
            View Report
          </Button>
        </Link>
      </Paper>
    </Grid>
  );
};

export default UserPreviewReport;
