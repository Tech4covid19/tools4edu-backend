import { Inject, Injectable } from '@nestjs/common';
import { VIDEOS_MODEL } from '../constants';
import { Video } from './interfaces/video.interface';
import { Model, Types } from 'mongoose';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';
import { StakeholdersService } from '../stakeholders/stakeholders.service';

@Injectable()
export class VideosService {
  constructor(
    @Inject(VIDEOS_MODEL)
    private videoModel: Model<Video>,
    private stakeholdersService: StakeholdersService
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const foundStakeholder = await this.stakeholdersService.findOne(createVideoDto.stakeholderId);

    if (foundStakeholder) {
      const createdVideo = new this.videoModel({
        ...createVideoDto,
        stakeholder: Types.ObjectId(createVideoDto.stakeholderId)
      });
      return createdVideo.save();
    } else {
      throw new Error('Stakeholder not found')
    }
  }

  async findAll(query = {}): Promise<Video[]> {
    return await this.videoModel.find(query).exec();
  }

  async findOne(id: string): Promise<Video> {
    return this.videoModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Video> {
    return this.videoModel.findByIdAndRemove(id)
  }

  async update(id: string, video: UpdateVideoDto): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(id, video, { new: true });
  }
}
