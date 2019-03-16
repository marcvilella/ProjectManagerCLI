
export const Config = {
      //API Configuration
      authUrl: 'http://localhost:3000/api/auth/',
      socketConnection: 'http://localhost:3000',
      // socketConnection: 'http://192.168.1.4:3000',
      // authUrl: 'http://192.168.1.4:3000/api/auth/',
      ip: '127.0.0.1'    
}

export enum AuthURLs {

      SignUp = 'signup',
      LogIn = 'login',
      LogOut = 'logout',
      VerifyEmail = 'verifyemail',
      TokenInfo = 'tokeninfo',
      PasswordResetRequest = 'passwordresetrequest',
      PasswordReset = 'passwordreset'
}

