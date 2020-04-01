import { Document } from 'mongoose';

export class BlogArticle extends Document {
  readonly title: string;
  readonly author: string;
  readonly images: string[];
  readonly text: string;
  readonly slug: string;
  readonly published: boolean;
}