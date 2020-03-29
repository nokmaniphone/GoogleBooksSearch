import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import BookContext from '../../utils/BookContext';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 25
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151
  },
  marginPls: {
    marginTop: 100,
  }

}));



export default function SavedCard() {
  const classes = useStyles();
  const theme = useTheme();


  const { userBooks, handleDeleteBook } = useContext(BookContext);
  console.log(userBooks);
  return (
    <Container className={classes.marginPls}>
      <Typography component='h3' variant='h3'>Saved Books</Typography>
      {userBooks.length > 0 ? userBooks.map((book, index) =>
        <Card key={index} className={classes.root}>
          <CardMedia
            width={1 / 1}
            className={classes.cover}
            image={book.imageLinks ? book.imageLinks.thumbnail : "https://via.placeholder.com/300"}
            title={book.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {book.authors}
              </Typography>
              <Typography variant="body2" component="p">
                {book.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={book.infoLink} target="_blank" size="small">View on Google Books</Button>
              <Button size="small" onClick={() => { handleDeleteBook(book._id, index) }}>Remove</Button>

            </CardActions>
          </div>

        </Card>
      ) : <Typography component="h6" variant="h6">No Books Saved</Typography>}
    </Container>
  );
}