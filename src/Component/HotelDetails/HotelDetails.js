import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 200,
        height: 155,
    }
}));

const HotelDetails = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const {hotel_name, hotel_details, price, img, rating} = props.info;

    return (
        <Card className={classes.root} className="m-3 row">
                <div className="col-4">
                    <CardMedia className={classes.cover} image={img} title="Live from space album cover"/>
                </div>
                <div className={classes.details} className="col-8">
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">{hotel_name}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{hotel_details}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">rating: {rating}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">$ {price}</Typography>
                    </CardContent>
                </div>
        </Card>
    );
};

export default HotelDetails;