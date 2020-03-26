import { Inject, Injectable } from '@nestjs/common';
import { VIDEOS_MODEL } from '../constants';
import { Video } from './interfaces/video.interface';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @Inject(VIDEOS_MODEL)
    private videoModel: Model<Video>
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = new this.videoModel(createVideoDto);
    return createdVideo.save();
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

  async update(id: string, video: Video): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(id, video, { new: true });
  }
}
