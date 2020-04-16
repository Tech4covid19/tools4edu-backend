declare const global: any;
global.fetch = require('node-fetch');

import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthNewpasswordDto } from './dto/auth-newpassword.dto';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'eu-central-1_lna1DYJrH',
      ClientId: '7841u4b3rt1e3iomm1l15dg5ff',
    })
  }

  async login(userDetails: AuthLoginDto) {
    const { email, password } = userDetails;

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const user = new CognitoUser(userData);

    return new Promise((resolve, reject: any) => {
      return user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          resolve({
            email: email,
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken()
          });
        },
        onFailure: ((err) => {
          console.log('err', err);
          reject(err)
        }),
        newPasswordRequired: ((authDetails) => {

          delete authDetails.email_verified;

          resolve({
            email: email,
            needPasswordChange: true
          });

          return null;
        })
      })
    })
  }

  async completeNewPasswordChallenge(userDetails: AuthNewpasswordDto) {
    const { email, newPassword, oldPassword } = userDetails;

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: oldPassword
    });

    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const user = new CognitoUser(userData);

    return new Promise((resolve, reject: any) => {
      return user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log('on success', result)
        },
        onFailure: ((err) => {
          console.log('err', err);
          reject(err)
        }),
        newPasswordRequired: ((authDetails) => {

          delete authDetails.email_verified;

          return user.completeNewPasswordChallenge(newPassword, { email: email }, {
            onSuccess: (result) => {
              resolve({
                email: email,
                accessToken: result.getAccessToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken()
              })
            },
            onFailure: (err) => {
              console.log('err new pass', err);
              reject(err)
            }
          });

        })
      })
    });

  }

}

