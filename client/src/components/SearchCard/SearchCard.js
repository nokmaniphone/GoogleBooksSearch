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
import "./SearchCard.css"

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3)
  },

}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });


  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};



export default function SearchCard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { searchBooks, handleSaveBook } = useContext(BookContext);

  return (
    <Container>
      {searchBooks.map((book, index) =>
        <Card key={index} className={classes.root}>
          <CardMedia
            width={3 / 3}
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
              <Button size="small" onClick={() => { handleSaveBook(index); handleOpen() }}>Save</Button>
              <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <Typography component="h2" id="spring-modal-title">Book Saved!</Typography>
                    <Typography component="p" id="spring-modal-description">View it in your saved books</Typography>
                  </div>
                </Fade>
              </Modal>
            </CardActions>
          </div>

        </Card>
      )}
    </Container>
  );
}