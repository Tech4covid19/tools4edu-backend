import { Injectable } from '@nestjs/common';
import { Faq } from './interfaces/faq.interface';
import { Model, Types } from 'mongoose';
import { CreateFaqDto, UpdateFaqDto } from './dto/faq.dto';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel('Faq')
    private faqModel: Model<Faq>,
    private stakeholdersService: StakeholdersService
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const foundStakeholder = await this.stakeholdersService.findOne(createFaqDto.stakeholderId);

    if (foundStakeholder) {
      const createdFaq = new this.faqModel({
        ...createFaqDto,
        stakeholder: Types.ObjectId(createFaqDto.stakeholderId)
      });
      return createdFaq.save();
    } else {
      throw new Error('Stakeholder not found')
    }
  }

  async findAll(query = {}): Promise<Faq[]> {
    return await this.faqModel.find(query).exec();
  }

  async findOne(id: string): Promise<Faq> {
    return this.faqModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Faq> {
    return this.faqModel.findByIdAndRemove(id)
  }

  async update(id: string, faq: UpdateFaqDto): Promise<Faq> {
    return this.faqModel.findByIdAndUpdate(id, faq, { new: true });
  }
}
