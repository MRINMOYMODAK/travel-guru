import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "80%",
  },
}));

export default function BookingCard(props) {
    
    const classes = useStyles();
    const bookInfoKey = props.id;

  return (
    <div>
        <Form className="w-100 m-2">
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Origin</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
            <div className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="From"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="To"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </div>
        </Form>
        <Link to={`/hotels/${bookInfoKey}`} style={{textDecoration: "none"}}>
            <Button className="mx-2 mt-4" variant="warning" size="lg" block>Start Booking</Button><br />
        </Link>
    </div>
  );
}