import React from 'react'
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

const PrivateRouteControl: React.FC<Props> = (props: Props) => {
    const { children, isAuthenticated } = props;

    return (
        <>
            {
                isAuthenticated ? (
                    children
                ) : (
                    <Navigate to="/login" />
                )
            }
        </>

    )
}

export default PrivateRouteControl