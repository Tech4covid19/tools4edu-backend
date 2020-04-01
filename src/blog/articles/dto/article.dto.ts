export class CreateBlogArticleDto {
  readonly title: string;
  readonly author: string;
  readonly images: string[];
  readonly text: string;
  readonly slug: string;
  readonly published: boolean;
}

export class UpdateBlogArticleDto {
  readonly title?: string;
  readonly author?: string;
  readonly images?: string[];
  readonly text?: string;
  readonly slug?: string;
  readonly published?: boolean;
}