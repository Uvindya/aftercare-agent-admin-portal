import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';

const useStyles = makeStyles(() => ({
  cardRoot: {
    height: '100%',
    '& .Cmt-card-content': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    width: '30%',
    float: 'left',
    margin: '30px 10px 0px 10px',
  },
  btnRoot: {
    height: 40,
  },
}));

const ReportItem = ({ item, onReportClick }) => {
  const classes = useStyles();
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Box flex={1}>
            <Typography component="div" variant="h2">
              {item.name}
            </Typography>
          </Box>
        </Box>
        <Box component="p" mb={4} color="text.secondary">
          {item.description}
        </Box>
        <Box mt="auto">
          <Button
            variant="outlined"
            color="primary"
            className={classes.btnRoot}
            onClick={() => onReportClick(item.type, item)}>
            Generate
          </Button>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default ReportItem;
