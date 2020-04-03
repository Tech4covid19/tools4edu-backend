import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Stakeholder } from './interfaces/stakeholder.interface';
import { CreateStakeholderDto } from './dto/create-stakeholder.dto';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class StakeholdersService {
  constructor(
    @InjectModel('Stakeholder')
    private stakeholderModel: Model<Stakeholder>
  ) {}

  async create(createStakeholderDto: CreateStakeholderDto): Promise<Stakeholder> {
    const createdStakeholder = new this.stakeholderModel(createStakeholderDto);
    return createdStakeholder.save();
  }

  async findAll(query = {}): Promise<Stakeholder[]> {
    return await this.stakeholderModel.find(query).exec();
  }

  async findOneByQuery(query = {}): Promise<Stakeholder> {
    return this.stakeholderModel.findOne(query);
  }

  async findOne(id: string): Promise<Stakeholder> {
    return this.stakeholderModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Stakeholder> {
    return this.stakeholderModel.findByIdAndRemove(id)
  }

  async update(id: string, stakeholder: Stakeholder): Promise<Stakeholder> {
    return this.stakeholderModel.findByIdAndUpdate(id, stakeholder, { new: true });
  }
}
