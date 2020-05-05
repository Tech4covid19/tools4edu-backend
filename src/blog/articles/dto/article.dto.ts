export class CreateBlogArticleDto {
  readonly title: string;
  readonly summary: string;
  readonly author: string;
  readonly images?: string[];
  readonly text: string;
  readonly slug: string;
  readonly published: boolean;
  readonly videoUrl?: string;
}

export class UpdateBlogArticleDto {
  readonly title?: string;
  readonly summary?: string;
  readonly author?: string;
  readonly images?: string[];
  readonly text?: string;
  readonly slug?: string;
  readonly published?: boolean;
  readonly videoUrl?: string;
}
