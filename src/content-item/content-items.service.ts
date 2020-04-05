import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IContentItem } from './interfaces/content-item.interface';
import { Model } from 'mongoose';
import { CreateContentItemDto, UpdateContentItemDto } from './dto/content-item.dto';

@Injectable()
export class ContentItemsService {
  constructor(
    @InjectModel('ContentItem')
    private contentItemModel: Model<IContentItem>
  ) {}

  async create(createContentItemDto: CreateContentItemDto): Promise<IContentItem> {
    const createdContentItem = new this.contentItemModel(createContentItemDto);
    return createdContentItem.save();
  }

  async findAll(query = {}, limit = 20, startAt = 0): Promise<IContentItem[]> {
    return await this.contentItemModel
      .find(query)
      .skip(startAt)
      .limit(limit)
      .exec();
  }

  async findOneByQuery(query: {}): Promise<IContentItem> {
    return this.contentItemModel.findOne(query);
  }

  async delete(id: string): Promise<IContentItem> {
    return this.contentItemModel.findByIdAndRemove(id);
  }

  async update(id: string, contentItem: UpdateContentItemDto): Promise<IContentItem> {
    return this.contentItemModel.findByIdAndUpdate(id, contentItem, { new: true });
  }

  async countDocs(query): Promise<number> {
    return new Promise((resolve, reject) => {
      this.contentItemModel.countDocuments(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
    });
  }
}
