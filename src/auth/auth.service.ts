import { Auth } from './interfaces/auth.interface';

declare const global: any;
global.fetch = require('node-fetch');

import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthNewpasswordDto } from './dto/auth-newpassword.dto';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'us-east-1_p1GLIzxBk',
      ClientId: '6mv2gugukvlkl7fok2krtumbq2',
    })
  }

  async register(authRegisterRequest: AuthRegisterDto) {
    const { name, email, password } = authRegisterRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(email, password,
        [new CognitoUserAttribute({ Name: 'name', Value: name })],
        null,
        (err, result) => {
          if (!result) {
            reject(err)
          } else {
            resolve(result.user)
          }
        })
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

