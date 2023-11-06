import React from 'react';
import classes from './ApplicationToast.module.scss';
import { Toast, ToastContainer } from 'react-bootstrap';

export const ApplicationToast = ({ headerProps = {}, bodyProps = {}, ...props }) => {
    const { small = '', strong = '', src = '', imageClassName = '', headerClassName = '' } = headerProps;
    const { text = '' } = bodyProps;
    let imageClass = classes.img;
    let headerClass = classes.header
    if (imageClassName) {
        imageClass = `${imageClass} ${imageClassName}`
    }
    if (headerClassName) {
        headerClass = `${headerClass} ${headerClassName}`
    }

    const showHeader = src || strong || small
    return (
        <div>
            <ToastContainer {...props}>
                <Toast animation={true} {...props}>
                    {showHeader && (
                        <Toast.Header {...headerProps}>
                            <div className={headerClass} >
                                <div>
                                    {src &&
                                        <img
                                            src={src}
                                            className={imageClass}
                                        />
                                    }
                                    {strong && <strong >{strong}</strong>}
                                </div>
                                {small && <small >{small}</small>}
                            </div>
                        </Toast.Header>
                    )}
                    {text && <Toast.Body {...bodyProps}>{text}</Toast.Body>}
                </Toast>
            </ToastContainer>
        </div>
    )
}
