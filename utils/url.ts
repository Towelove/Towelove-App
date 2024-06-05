// 查询字符串转对象
export function query2Json(query: string): { [propsName: string]: string } {
  const ret: { [propsName: string]: string } = {};
  let q: string = query;

  if (query[0] === '?') {
    q = query.slice(1);
  }

  const groups = q.split('&');

  groups.forEach((group: string) => {
    const [key, value] = group.split('=');

    ret[key] = value;
  });

  return ret;
}

// url上拼参数
export function paramsFilter(url: string, obj: { [prop: string]: string | number }): string {
  let result = '';
  let item;
  if (url.includes('?')) {
    for (item in obj) {
      if (obj[item] && String(obj[item])) {
        result += `&${item}=${obj[item]}`;
      }
    }
  } else {
    result += '?';
    for (item in obj) {
      if (obj[item] && String(obj[item])) {
        result += `&${item}=${obj[item]}`;
      }
    }
  }
  return url + result;
}

/**
 * 获取query参数
 * @param  {string} name 需要获取的参数key值
 * @return url参数中对应name的值 或者所有参数-值的对象
 */
export const getUrlParams = function <
  T extends string | undefined,
  R = T extends string ? string : { [name: string]: string },
>(name: T, paramSearch?: string): R {
  const searchMatch = (paramSearch || window.location.search).match(/\?.*(?=\b|#)/);
  const search = searchMatch ? searchMatch[0].replace(/^\?/, '') : '';

  if (!search) return typeof name !== 'undefined' ? ('' as R) : ({} as R);

  const queries: { [name: string]: string } = {};
  const params = search.split('&');

  for (const i in params) {
    const param = params[i].split('=');
    queries[param[0]] = param[1] ? decodeURIComponent(param[1]) : '';
  }

  return name ? (queries[name] as R) : (queries as R);
};

/**
 * 给url注入参数，注入的参数会覆盖旧参数
 * @param {{ [name: string]: string }}                           params  要注入的参数
 * @param {string}                           url     要注入参数的url, 为空时取当前页面url
 * @param {string[]}                             withouts url中需要排除的参数key数组
 * @return {string}                          注入参数后的url
 */
export const fillParams = function (
  params: { [name: string]: string },
  urlParam?: string,
  withouts?: string[],
): string {
  const url = urlParam || window.location.href;

  const urlPairs = url.split('#'),
    fullUrl = urlPairs[0],
    hashUrl = (urlPairs.length > 1 && '#' + urlPairs[1]) || '',
    baseUrl = fullUrl.split('?')[0],
    originParams = getUrlParams(undefined, fullUrl),
    paramsList = [];
  let re = '';

  for (const key in originParams) {
    if (params[key] === undefined && (withouts || []).indexOf(key) === -1) {
      paramsList.push(key + '=' + originParams[key]);
    }
  }

  for (const key1 in params) {
    if ((withouts || []).indexOf(key1) === -1) {
      if (params[key1] !== undefined) {
        paramsList.push(key1 + '=' + params[key1]);
      }
    }
  }

  re += baseUrl;
  re += (paramsList.length && '?' + paramsList.join('&')) || '';
  re += hashUrl;

  return re;
};

export const  removeQueryParam = (url:any, keyToRemove:string) =>  {
  // 创建一个新的URL对象
  const urlObj = new URL(url);
  
  // 获取URL的查询参数
  const searchParams = urlObj.searchParams;
  
  // 移除指定的查询参数
  searchParams.delete(keyToRemove);
  
  // 更新URL的查询字符串
  urlObj.search = searchParams.toString();
  
  // 返回新的URL
  return urlObj.toString();
}