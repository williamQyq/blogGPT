import React from 'react';
import type { CSSProperties } from 'react';
import { FcGoogle, } from 'react-icons/fc';
import { AiFillApple, } from 'react-icons/ai';
import { LoginFormPage, } from '@ant-design/pro-components';
import { Tabs, Typography } from 'antd';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from '@emotion/css';
import { GlobalToken } from 'antd/lib/theme/interface';
import withToken from '@control/WithThemeToken';
import { IAuthenticationState } from '@redux-reducer/auth.reducer';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const oAuthStyles: CSSProperties = {
    margin: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: "80%",
    border: '2px solid #D4D8DD',
    borderRadius: '4px',
    cursor: "pointer"
}

interface IProLoginState {

}

interface IProLoginProps extends IAuthenticationState {
    token: GlobalToken
    // loadUser: () => Promise<any>;
}

class ProLogin extends React.Component<IProLoginProps, IProLoginState>{
    constructor(props: IProLoginProps) {
        super(props);
        this.state = {

        }
    }

    componentDidUpdate(prevProps: Readonly<IProLoginProps>, prevState: Readonly<IProLoginState>, snapshot?: any): void {
        // const { auth } = this.props;

        //check authenticated status if props.auth changed
        // if (prevProps.auth !== auth) {
        //     if (auth.isAuthenticated) {
        //         this.props.navigate('/', { replace: true });
        //     }
        // }
    }

    //google oauth login
    // handleGoogleOAuthLogin = () => {
    //     let timer: NodeJS.Timeout | null = null;
    //     const openOAuthWindow = (): Window | null => {
    //         const googleOAuthURL = "http://localhost:5000/api/auth/google";
    //         return window.open(googleOAuthURL, "_blank", "width=500,height=600");
    //     }
    //     const newWindow = openOAuthWindow();
    //     if (newWindow) {
    //         console.log(`opened new window`)
    //         timer = setInterval(() => {
    //             if (newWindow.closed) {

    //                 this.props.loadUser();
    //                 if (timer) clearInterval(timer);
    //             }
    //         }, 500);
    //     }
    // }

    render() {
        const { token } = this.props;
        // const { isAuthenticated } = this.props.auth;

        let isAuthenticated = false
        return (
            isAuthenticated ? (
                <Navigate to={'/dashboard'} replace={true} />
            ) : (
                <div className={css`
                    height: 100vh;
                    .ant-pro-form-login-page-container{
                        background: ${token!.colorBgContainer};
                    }
                    .ant-pro-form-login-page-title{
                        color:${token!.colorText}
                    }
                `}>
                    <LoginFormPage
                        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                        title="Welcome to BlogHub"
                        submitter={{ render: false }}
                        subTitle="A hub built to share love and knowledge.💜"
                        actions={
                            < div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <div
                                    style={oAuthStyles}
                                    onClick={() => {
                                        // this.handleGoogleOAuthLogin()
                                    }}
                                >
                                    <FcGoogle style={{ ...iconStyles }} />
                                    <Typography.Text>Sign In with Google</Typography.Text>
                                </div>
                                <div
                                    style={oAuthStyles}
                                    onClick={() => {
                                        //this.handleAppleOAuthLogin() 
                                    }}>
                                    <AiFillApple style={{ ...iconStyles, color: `${token!.colorText}` }} />
                                    <Typography.Text>Sign In with Apple</Typography.Text>
                                </div>
                            </div>
                        }
                    >
                        <Tabs
                            centered
                            items={[
                                { key: "OAuth", label: "Log in to your account" },
                            ]}
                        />
                    </LoginFormPage >
                </div >
            )
        );
    }
};

// const mapStateToProps = (state: ReduxStateSignIn) => ({
//     auth: state.auth,
//     error: state.error
// });

const mapActionToProps = {
    //...
}
// export default
//     connect(
//         null,
//         // mapStateToProps,
//         mapActionToProps

//     )(ProLogin);
export default withToken(ProLogin)