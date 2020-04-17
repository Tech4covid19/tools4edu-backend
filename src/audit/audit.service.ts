import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuditLog } from './interfaces/audit.interface';
import { Model } from 'mongoose';
import { CreateAuditLogDto } from './dto/audit.dto';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Injectable()
export class AuditService extends JwtStrategy {

  public readonly LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';
  public readonly LOGIN_ERROR_ACTION = 'LOGIN_ERROR';
  public readonly UPDATE_ACTION = 'UPDATE';
  public readonly CREATE_ACTION = 'CREATE';
  public readonly DELETE_ACTION = 'DELETE';

  constructor(
    @InjectModel('AuditLog')
    private auditLogModel: Model<AuditLog>
  ) {
    super();
  }

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    return new Promise((resolve, reject) => {
      this.validate({token: createAuditLogDto.token}, (err, result) => {
        if (err) reject(err);

        const createdAuditLog = new this.auditLogModel({...createAuditLogDto, userEmail: result.userName});
        resolve(createdAuditLog.save());
      })
    })
  }

  async findAll(query = {}): Promise<AuditLog[]> {
    return this.auditLogModel.find(query).exec();
  }

  async findOneByQuery(query: {}): Promise<AuditLog> {
    return this.auditLogModel.findOne(query);
  }

}
