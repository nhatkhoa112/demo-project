import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  formControl: {},
  paper: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    background: 'blue',
    color: 'white',
    '&:hover': {
      background: '#0827B8',
    },
  },
}));
