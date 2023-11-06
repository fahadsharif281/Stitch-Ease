import { Rating } from '@mui/material';
import React from 'react'
import { Card } from 'react-bootstrap';
import classes from './DetailCard.module.scss';

const DetailCard = ({ bodyClassName, header, title, text, ratingProps, ...props }) => {
    return (
        <div>
            <Card {...props}>
                {header && <Card.Header>{header}</Card.Header>}
                <Card.Body className={bodyClassName}>
                    {title && <Card.Title>{title}</Card.Title>}
                    {text && <Card.Text className={classes.text}>
                        {text}
                    </Card.Text>
                    }
                    {ratingProps &&
                        <Rating
                            {...ratingProps} />
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default DetailCard