import { Card, CardContent, Paper, Typography } from '@mui/material';

const mockdata = {
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "report": {
    "title": "ACME Environmental Report 2021",
    "description": "Environmental report for ACME covering the period 2021",
    "created": "2017-07-21T17:32:28Z",
    "updated": "2017-07-21T17:32:28Z",
    "data": [
      {
        "description": "description for metric",
        "metricId": "e1.2.3",
        "type": "string",
        "value": "1234.567"
      },
      {
        "description": "description for metric2",
        "metricId": "e1.2.5",
        "type": "boolean",
        "value": "yes"
      }
    ]
  }
};

const { uuid, report } = mockdata;
const { title, description, created, updated, data } = report;

const Report = () => {
  return (
    <Paper sx={{ padding: '16px', backgroundColor: '#F5F5F5'  }}>
      <Card sx={{ marginBottom: '16px'}}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>UUID:</b> {uuid}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
            <b>Description:</b> {description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
            <b>Created:</b> {created}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ lineHeight: 1 }}>
            <b>Updated:</b> {updated}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Metrics:
      </Typography>
      {data.map((item) => (
        <Card key={item.metricId} sx={{ marginBottom: '16px' }}>
          <CardContent >
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
  );
};

export default Report;
