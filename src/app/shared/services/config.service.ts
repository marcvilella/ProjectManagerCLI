export const Config = {
      //API Configuration
      url: 'http://localhost:3000/api/auth/',
      ip: '127.0.0.1'    
}

export enum AuthURLs {
      SignUp = 'signup',
      LogIn = 'login',
      VerifyEmail = 'verifyemail',
      TokenInfo = 'tokeninfo',
      PasswordResetRequest = 'passwordresetrequest',
      PasswordReset = 'passwordreset'
}

