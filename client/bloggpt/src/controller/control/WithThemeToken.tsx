import React from 'react';
import { theme } from 'antd';
import { GlobalToken } from 'antd/es/theme';


type ComponentWithToken = React.ComponentType<{ token: GlobalToken } & any>;

/**
 * 
 * @description antd theme token
 * @returns 
 */
const withToken = (Component: ComponentWithToken) => {
    return () => {
        const { token } = theme.useToken();
        return <Component token={token} />;
    }
}

export default withToken;