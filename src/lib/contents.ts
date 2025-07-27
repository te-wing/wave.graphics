export interface ContentMeta {
  slug: string;
  title: string;
  description?: string;
}

// すべての記事のメタデータを手動で定義
// 新しい記事を追加する際は、ここにエントリーを追加する必要があります
export const allContents: ContentMeta[] = [
  {
    slug: 'my-first-post',
    title: '私の最初の投稿',
    description: 'これは私の最初のブログ投稿です。',
  },
  {
    slug: 'another-post',
    title: '別の投稿のタイトル',
    description: 'Next.jsの機能について掘り下げます。',
  },
];

export function getContentsInOrder(): ContentMeta[] {
  return allContents;
}