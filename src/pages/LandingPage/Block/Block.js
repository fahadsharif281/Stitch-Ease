import React from 'react'
import classes from './Block.module.scss';

export const Block = () => {
    return (
        <div className={classes.container}>
            <div className={classes.text}>
                <p>
                    The clothing industry takes a stunning toll on the environment. That doesn’t sit right with us, so we’re leading the charge towards top-to-bottom, seed-to-sew Responsibility.

                    Join us in Protecting Wild, Forever.
                </p>
            </div>
        </div>
    )
}
