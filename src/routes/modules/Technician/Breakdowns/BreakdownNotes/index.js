import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CmtCarousel from '../../../../../@coremat/CmtCarousel';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import { Close } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import CmtCard from '../../../../../@coremat/CmtCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCardMedia from '../../../../../@coremat/CmtCard/CmtCardMedia';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { breakdownNotes } from '../../../../../redux/actions/Breakdowns';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: theme.typography.fontWeightBold,
  },
  imageRoot: {
    width: '100%',
    height: 250,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 6,
  },
  linkBtn: {
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  priceWrapper: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: 16,
      textAlign: 'left',
    },
  },
  priceRoot: {
    fontSize: 16,
    color: theme.palette.primary.main,
    marginBottom: 5,
    fontWeight: theme.typography.fontWeightRegular,
  },
  badge: {
    color: theme.palette.common.white,
    fontSize: 12,
    height: 24,
  },
  carouselRoot: {
    marginRight: 0,
    '& .bottom-left .slick-dots': {
      left: 24,
    },
    '& .slick-dots': {
      bottom: 24,
      '& li button:before': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      '& li.slick-active button:before': {
        backgroundColor: theme.palette.warning.main,
      },
    },
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    marginBottom: 16,
    display: 'inline-block',
  },
}));

const AddEditBreakdownNotes = ({ selectedBreakdown, showBreakdownList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [completionNote, setCompletionNote] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [solution, setSolution] = useState('');

  useEffect(() => {
    if (selectedBreakdown) {
      setCompletionNote(selectedBreakdown.completionNote);
      setAdditionalNote(selectedBreakdown.additionalNote);
      setRootCause(selectedBreakdown.rootCause);
      setSolution(selectedBreakdown.solution);
    }
  }, [selectedBreakdown, dispatch]);

  const onSubmitClick = () => {
    if (
      (completionNote == null && additionalNote == null && rootCause == null && solution == null) ||
      (additionalNote === '' && completionNote === '' && solution === '' && rootCause === '')
    ) {
      showBreakdownList();
      return;
    }
    dispatch(
      breakdownNotes(selectedBreakdown.id, { completionNote, additionalNote, solution, rootCause }, data => {
        showBreakdownList();
      }),
    );
  };

  return (
    <CmtCard>
      <Box display="block" flexDirection="row" alignItems={{ sm: 'center' }} px={6} py={3}>
        <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
          <Tooltip title="close">
            <Box ml={-3} clone>
              <IconButton onClick={showBreakdownList}>
                <Close />
              </IconButton>
            </Box>
          </Tooltip>
          <Typography component="div" variant="h4" className={classes.titleRoot}>
            {`${selectedBreakdown.product.name} (${selectedBreakdown.product.id}) - ${selectedBreakdown.description}`}
          </Typography>
        </Box>
        <Box display="block" alignItems="center" ml="auto">
          <Box
            className={classes.badgeRoot}
            component="span"
            ml={12}
            bgcolor={selectedBreakdown.status === 'COMPLETED' ? '#FF8C00' : '#8DCD03'}>
            {selectedBreakdown.status.replaceAll('_', ' ')}
          </Box>
        </Box>
      </Box>
      <Box p={6}>
        <GridContainer>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              multiline
              maxRows={4}
              rows={4}
              variant="outlined"
              label="Root Cause"
              value={rootCause}
              onChange={e => {
                setRootCause(e.target.value);
              }}
              helperText=""
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              multiline
              maxRows={4}
              rows={4}
              variant="outlined"
              label="Solution"
              value={solution}
              onChange={e => {
                setSolution(e.target.value);
              }}
              helperText=""
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              multiline
              maxRows={4}
              rows={4}
              variant="outlined"
              label="Completion Note"
              value={completionNote}
              onChange={e => {
                setCompletionNote(e.target.value);
              }}
              helperText=""
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              multiline
              maxRows={4}
              rows={4}
              variant="outlined"
              label="Additional Note"
              value={additionalNote}
              onChange={e => {
                setAdditionalNote(e.target.value);
              }}
              helperText=""
            />
          </Grid>
        </GridContainer>

        <Box display="flex" justifyContent="flex-end" mb={4} p={6}>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default AddEditBreakdownNotes;
