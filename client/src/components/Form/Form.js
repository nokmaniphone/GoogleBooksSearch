import React, {useContext} from 'react';
import BookContext from '../../utils/BookContext'
import { makeStyles, formatMs } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  formMargin: {
    marginTop: 100,
  },
}));

function Form (){
const classes = useStyles();
const {input, handleInputChange, handleSearchBook} = useContext(BookContext);

  return(
 <Container>
 <form className={classes.formMargin}>
  <Typography component="h3" variant="h3">Search for a book</Typography>
  <TextField
  id="filled-full-width"
  label="Book Title"
  placeholder=""
  value={input}
  fullWidth
  margin="normal"
  name="input"
  onChange={handleInputChange}
  InputLabelProps={{
    shrink: true,
  }}
  variant="filled"
/>

<Button variant="contained" color="primary" onClick={handleSearchBook}>Search</Button>

</form>
</Container>
  )
}

export default Form;