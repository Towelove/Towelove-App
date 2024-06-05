import qs from 'qs';
// 通过URL获取query部分 转query为对象
export function parseLocationSearch<T = any>(search?: string): T {
  return qs.parse(search || '', { ignoreQueryPrefix: true }) as unknown as T;
}

export const getQueryObj = (url:Location) => {
  const query: any = Array.from(new URLSearchParams(url.search)).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  return query
}
