import React from 'react';
import Box from '@material-ui/core/Box';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CmtMediaObject from '../../../../../@coremat/CmtMediaObject';
import CmtImage from '../../../../../@coremat/CmtImage';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import CmtCarousel from '../../../../../@coremat/CmtCarousel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import NoteIcon from '@material-ui/icons/NoteAdd';
import AcceptenceIcon from '@material-ui/icons/CheckCircle';
import ApproveIcon from '@material-ui/icons/CheckCircleOutline';

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

const BreakdownItem = ({ item, onBreakdownClick }) => {
  const classes = useStyles();
  const getTitle = () => (
    <React.Fragment>
      <Box className={classes.badgeRoot} component="span" bgcolor={item.status === 'COMPLETED' ? '#FF8C00' : '#8DCD03'}>
        {item.name}
      </Box>
    </React.Fragment>
  );

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
            onClick={() => onBreakdownClick(item.type, item)}>
            Generate
          </Button>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default BreakdownItem;
