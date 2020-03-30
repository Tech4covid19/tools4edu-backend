import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Testimony } from './interfaces/testimony.interface';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { TESTIMONIES_MODEL } from '../constants';


@Injectable()
export class TestimoniesService {
  constructor(
    @Inject(TESTIMONIES_MODEL)
    private testimonyModel: Model<Testimony>
  ) {}

  async create(createTestimonyDto: CreateTestimonyDto): Promise<Testimony> {
    const createdTestimony = new this.testimonyModel(createTestimonyDto);
    return createdTestimony.save();
  }

  async findAll(query = {}): Promise<Testimony[]> {
    return await this.testimonyModel.find(query).exec();
  }

  async findOne(id: string): Promise<Testimony> {
    return this.testimonyModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Testimony> {
    return this.testimonyModel.findByIdAndRemove(id)
  }

  async update(id: string, testimony: Testimony): Promise<Testimony> {
    return this.testimonyModel.findByIdAndUpdate(id, testimony, { new: true });
  }
}
