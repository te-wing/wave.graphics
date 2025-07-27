export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  isAvailable: boolean;
}

const beta: string = '現在β版です．利用可能ですが，予期せぬエラーが発生する可能性があります．また，一部のコンテンツは準備中である場合もあります．';
const preparing: string = '只今準備中です．利用可能になるまで，しばらくお待ちください．';

// すべての記事のメタデータを手動で定義
// 新しい記事を追加する際は、ここにエントリーを追加する必要があります
export const allContents: ContentMeta[] = [
  {
    slug: 'tanshindou',
    title: '単振動',
    description: '単振動は，波の基本です．さっそく可視化してみましょう．',
    isAvailable: true,
  },
  {
    slug: 'pulse',
    title: 'パルス波',
    description: 'ごく短い間の単独の波を，パルス波といいます．パルス波を用いて，波の伝わり方を観察しましょう．',
    isAvailable: true,
  },
  {
    slug: 'kasane',
    title: '波の重ね合わせ',
    description: 'パルス波を使って，二つの波が重なったらどうなるか，観察してみましょう．',
    isAvailable: true,
  },
  {
    slug: 'freeend',
    title: '自由端反射',
    description: '自由端反射は，波が固定されていない端点で反射するときに起こります．',
    isAvailable: true,
  },
  {
    slug: 'fixedend',
    title: '固定端反射',
    description: '固定端反射は，波が固定されている端点で反射するときに起こります．',
    isAvailable: true,
  },
  {
    slug: 'sinwave',
    title: '正弦波',
    description: beta,
    isAvailable: false,
  },
  {
    slug: 'tateyoko',
    title: '縦波と横波',
    description: preparing,
    isAvailable: false,
  },
];

export function getContentsInOrder(): ContentMeta[] {
  return allContents;
}