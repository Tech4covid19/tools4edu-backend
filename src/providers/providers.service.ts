import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { Provider } from './interfaces/provider.interface';
import { CreateProviderDto } from './dto/create-provider.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel('Provider')
    private providerModel: Model<Provider>
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const createdProvider = new this.providerModel(createProviderDto);
    return createdProvider.save();
  }

  async findAll(query = {}): Promise<Provider[]> {
    return await this.providerModel.find(query).exec();
  }

  async findOneByQuery(query = {}): Promise<Provider> {
    return this.providerModel.findOne(query);
  }

  async delete(id: string): Promise<Provider> {
    return this.providerModel.findByIdAndRemove(id)
  }

  async update(id: string, provider: Provider): Promise<Provider> {
    return this.providerModel.findByIdAndUpdate(id, provider, { new: true });
  }
}
