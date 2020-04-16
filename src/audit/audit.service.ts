import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuditLog } from './interfaces/audit.interface';
import { Model } from 'mongoose';
import { CreateAuditLogDto } from './dto/audit.dto';

@Injectable()
export class AuditService {

  public readonly LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';
  public readonly LOGIN_ERROR_ACTION = 'LOGIN_ERROR';
  public readonly UPDATE_ACTION = 'UPDATE';
  public readonly CREATE_ACTION = 'CREATE';
  public readonly DELETE_ACTION = 'DELETE';

  constructor(
    @InjectModel('AuditLog')
    private auditLogModel: Model<AuditLog>
  ) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const createdAuditLog = new this.auditLogModel(createAuditLogDto);
    return createdAuditLog.save();
  }

  async findAll(query = {}): Promise<AuditLog[]> {
    return this.auditLogModel.find(query).exec();
  }

  async findOneByQuery(query: {}): Promise<AuditLog> {
    return this.auditLogModel.findOne(query);
  }

}
