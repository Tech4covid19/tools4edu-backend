import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BlogArticle } from './interfaces/article.interface';
import { CreateBlogArticleDto, UpdateBlogArticleDto } from './dto/article.dto';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('BlogArticle')
    private blogArticleModel: Model<BlogArticle>
  ) {}

  async create(createBlogArticleDto: CreateBlogArticleDto): Promise<BlogArticle> {
    const createdBlogArticle = new this.blogArticleModel(createBlogArticleDto);
    return createdBlogArticle.save();
  }

  async findAll(query = {}): Promise<BlogArticle[]> {
    return await this.blogArticleModel.find(query).exec();
  }

  async findOne(id: string): Promise<BlogArticle> {
    return this.blogArticleModel.findOne({ _id: id });
  }

  async findOneByQuery(query: {}): Promise<BlogArticle> {
    return this.blogArticleModel.findOne(query);
  }

  async delete(id: string): Promise<BlogArticle> {
    return this.blogArticleModel.findByIdAndRemove(id)
  }

  async update(id: string, blogArticle: UpdateBlogArticleDto): Promise<BlogArticle> {
    return this.blogArticleModel.findByIdAndUpdate(id, blogArticle, { new: true });
  }
}
