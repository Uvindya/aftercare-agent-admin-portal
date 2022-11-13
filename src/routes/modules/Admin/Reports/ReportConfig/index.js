import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppCheckBox from '../../../../../@jumbo/components/Common/formElements/AppCheckBox';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import Button from '@material-ui/core/Button';
import { Close } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import CmtCard from '../../../../../@coremat/CmtCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

const ReportConfig = ({ selectedReport, showReportList, keys, onReportKeyChange, onDownloadClick, type, technicians }) => {
  const classes = useStyles();

  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const offset = firstDay.getTimezoneOffset();
  firstDay = new Date(firstDay.getTime() - offset * 60 * 1000);
  lastDay = new Date(lastDay.getTime() - offset * 60 * 1000);

  const [from, setFrom] = useState(firstDay.toISOString().split('T')[0]);
  const [to, setTo] = useState(lastDay.toISOString().split('T')[0]);
  const [technician, setTechnician] = useState(0);

  if (type === 'TWS') technicians = [{ id: '0', key: 'ALL' }, ...technicians];

  return (
    <CmtCard>
      <Box display="block" flexDirection="row" alignItems={{ sm: 'center' }} px={6} py={3}>
        <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
          <Tooltip title="close">
            <Box ml={-3} clone>
              <IconButton onClick={showReportList}>
                <Close />
              </IconButton>
            </Box>
          </Tooltip>
          <Typography component="div" variant="h4" className={classes.titleRoot}>
            {selectedReport.name}
          </Typography>
        </Box>
      </Box>
      <Box p={6}>
        {type === 'TWS' && (
          <GridContainer>
            <Grid item xs={6} sm={6}>
              <AppSelectBox
                fullWidth
                data={technicians}
                label="Technician"
                valueKey="id"
                variant="outlined"
                labelKey="key"
                value={0}
                onChange={e => {
                  setTechnician(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} />
          </GridContainer>
        )}
        <GridContainer>
          <Grid item xs={6} sm={6}>
            <AppTextInput
              type="date"
              variant="outlined"
              label="From"
              value={from}
              onChange={e => {
                setFrom(e.target.value);
              }}
              helperText=""
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <AppTextInput
              type="date"
              variant="outlined"
              label="To"
              value={to}
              onChange={e => {
                setTo(e.target.value);
              }}
              helperText=""
            />
          </Grid>
          {Object.keys(keys).map(k => {
            return (
              <Grid item xs={4} sm={4}>
                <AppCheckBox
                  variant="outlined"
                  label={k}
                  checked={keys[k]}
                  onChange={e => {
                    onReportKeyChange(k, !keys[k]);
                  }}
                  helperText=""
                />{' '}
              </Grid>
            );
          })}
        </GridContainer>

        <Box display="flex" justifyContent="flex-end" mb={4} p={6}>
          <Box ml={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onDownloadClick(selectedReport.type, from, to, technician)}>
              Download
            </Button>
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default ReportConfig;
