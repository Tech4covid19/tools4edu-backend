import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentTag } from './interfaces/content-tag.interface';
import { Model } from 'mongoose';
import { CreateContentTagDto, UpdateContentTagDto } from './dto/content-tag.dto';

@Injectable()
export class ContentTagsService {
  constructor(
    @InjectModel('ContentTag')
    private contentTagModel: Model<ContentTag>
  ) {}

  async create(createContentTagDto: CreateContentTagDto): Promise<ContentTag> {
    const createdContentTag = new this.contentTagModel(createContentTagDto);
    return createdContentTag.save();
  }

  async findAll(query = {}): Promise<ContentTag[]> {
    return await this.contentTagModel.find(query).exec();
  }

  async findOne(id: string): Promise<ContentTag> {
    return this.contentTagModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<ContentTag> {
    return this.contentTagModel.findByIdAndRemove(id)
  }

  async update(id: string, contentTag: UpdateContentTagDto): Promise<ContentTag> {
    return this.contentTagModel.findByIdAndUpdate(id, contentTag, { new: true });
  }
}
