export const DEFAULT_PAGE_SIZE = 20

// 处理多页加载的Status [Count, PageIndex, PageSize, Pages]
export function ListLoaderStatus (data) {
  let {
    Count, PageIndex, PageSize, Pages
  } = data

  return {
    Count,
    PageIndex,
    PageSize,
    Pages,

    isAllLoaded: PageIndex >= Pages
  }
}
// 李明 无PageIndex参数
export function ListLoaderStatusNoIndex (data, PageIndex) {
  let {
    Count, PageSize, Pages
  } = data
  PageIndex = parseInt(PageIndex)

  return {
    Count,
    PageIndex,
    PageSize,
    Pages,

    isAllLoaded: (PageIndex) >= Pages
  }
}

// 下一页的参数
export function ParseStatusNextPage (config) {
  let isEmpty = config.PageIndex === undefined || config.PageIndex === null

  return [
    isEmpty ? 1 : config.PageIndex + 1,
    config.PageSize
  ]
}
