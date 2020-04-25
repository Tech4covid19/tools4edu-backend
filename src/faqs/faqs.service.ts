import { Injectable } from '@nestjs/common';
import { Faq } from './interfaces/faq.interface';
import { Model, Types } from 'mongoose';
import { CreateFaqDto, UpdateFaqDto } from './dto/faq.dto';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { InjectModel } from '@nestjs/mongoose';
import { ProvidersService } from '../providers/providers.service';

@Injectable()
export class FaqsService {
  constructor(
    @InjectModel('Faq')
    private faqModel: Model<Faq>,
    private stakeholdersService: StakeholdersService,
    private providersService: ProvidersService
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const foundStakeholder = await this.stakeholdersService.findOne(createFaqDto.stakeholderId);
    const foundProvider = await this.providersService.findOneByQuery({ _id: createFaqDto.providerId });

    if (foundStakeholder && foundProvider) {
      const createdFaq = new this.faqModel({
        ...createFaqDto,
        stakeholder: Types.ObjectId(createFaqDto.stakeholderId),
        provider: Types.ObjectId(createFaqDto.providerId)
      });
      return createdFaq.save();
    } else {
      if (!foundStakeholder) {
        throw new Error('Stakeholder not found')
      } else if (!foundProvider) {
        throw new Error('Provider not found')
      }
    }
  }

  async findAll(query = {}, limit = 100, startAt = 0): Promise<Faq[]> {
    return await this.faqModel
      .find(query)
      .skip(startAt)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Faq> {
    return this.faqModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Faq> {
    return this.faqModel.findByIdAndRemove(id)
  }

  async update(id: string, faq: UpdateFaqDto): Promise<Faq> {
    let foundStakeholder, foundProvider;

    let faqToUpdate = Object.assign({}, faq);

    if (faq.providerId) {
      foundProvider = await this.providersService.findOneByQuery({ _id: faq.providerId });
    }

    if (faq.stakeholderId) {
      foundStakeholder = await this.stakeholdersService.findOne(faq.stakeholderId);
    }

    if (faq.providerId && foundProvider) {
      faqToUpdate['provider'] = Types.ObjectId(faq.providerId)
    } else if (faq.providerId && !foundProvider) {
      throw new Error('Provider not found');
    }

    if (faq.stakeholderId && foundStakeholder) {
      faqToUpdate['stakeholder'] = Types.ObjectId(faq.stakeholderId)
    } else if (faq.stakeholderId && !foundStakeholder) {
      throw new Error('Stakeholder not found');
    }

    return this.faqModel.findByIdAndUpdate(id, faqToUpdate, { new: true });
  }

  async countDocs(query): Promise<number> {
    return new Promise((resolve, reject) => {
      this.faqModel.countDocuments(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
    });
  }
}
