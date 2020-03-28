import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'us-east-1_txKIBpet5',
      ClientId: '1dci5iouhb503bc5f90ec6rqm2'
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

    return new Promise((resolve, reject) => {
      return user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          resolve(result)
        },
        onFailure: ((err) => {
          reject(err)
        })
      })
    })
  }


}

