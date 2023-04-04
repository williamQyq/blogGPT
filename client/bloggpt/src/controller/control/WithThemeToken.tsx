import React from 'react';
import { theme } from 'antd';
import { GlobalToken } from 'antd/es/theme';


/**
 * 
 * @description antd theme token
 * @returns 
 */
const withToken = (Component: React.ComponentType<{ token: GlobalToken }>) => {
    return () => {
        const { token } = theme.useToken();
        return <Component token={token} />;
    }
}

export default withToken;