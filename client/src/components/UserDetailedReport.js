
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

const UserDetailedReport = () => {
  const {report} = useLocation()?.state
  return (
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
  )
};

export default UserDetailedReport;
