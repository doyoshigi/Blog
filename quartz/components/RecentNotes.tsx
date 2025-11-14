// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
// import { QuartzPluginData } from "../plugins/vfile"
// // import { byDateAndAlphabetical } from "./PageList"
// import style from "./styles/recentNotes.scss"
// // import { Date, getDate } from "./Date"
// import { Date } from "./Date"
// import { GlobalConfiguration } from "../cfg"
// import { i18n } from "../i18n"
// import { classNames } from "../util/lang"

// interface Options {
//   title?: string
//   limit: number
//   linkToMore: SimpleSlug | false
//   showTags: boolean
//   filter: (f: QuartzPluginData) => boolean
//   sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
// }

// const defaultOptions = (cfg: GlobalConfiguration): Options => ({
//   limit: 3,
//   linkToMore: false,
//   showTags: true,
//   filter: () => true,
//   sort: (f1: QuartzPluginData, f2: QuartzPluginData): number => {
//     const d1 = f1.dates?.created?.getTime() ?? 0
//     const d2 = f2.dates?.created?.getTime() ?? 0

//     if (d2 !== d1) {
//       return d2 - d1
//     }

//     const t1 = f1.frontmatter?.title ?? f1.slug ?? ""
//     const t2 = f2.frontmatter?.title ?? f2.slug ?? ""
//     return t1.localeCompare(t2)
//   },
// })

// export default ((userOpts?: Partial<Options>) => {
//   const RecentNotes: QuartzComponent = ({
//     allFiles,
//     fileData,
//     displayClass,
//     cfg,
//   }: QuartzComponentProps) => {
//     const opts = { ...defaultOptions(cfg), ...userOpts }
//     const pages = allFiles.filter(opts.filter).sort(opts.sort)
//     const remaining = Math.max(0, pages.length - opts.limit)
//     return (
//       <div class={classNames(displayClass, "recent-notes")}>
//         <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
//         <ul class="recent-ul">
//           {pages.slice(0, opts.limit).map((page) => {
//             const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
//             const tags = page.frontmatter?.tags ?? []

//             return (
//               <li class="recent-li">
//                 <div class="section">
//                   <div class="desc">
//                     <h3>
//                       <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
//                         {title}
//                       </a>
//                     </h3>
//                   </div>
//                   {page.dates && page.dates.created && (
//                     <p class="meta">
//                       <Date date={page.dates.created} locale={cfg.locale} />
//                     </p>
//                   )}
//                   {opts.showTags && (
//                     <ul class="tags">
//                       {tags.map((tag) => (
//                         <li>
//                           <a
//                             class="internal tag-link"
//                             href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
//                           >
//                             {tag}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </li>
//             )
//           })}
//         </ul>
//         {opts.linkToMore && remaining > 0 && (
//           <p>
//             <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
//               {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
//             </a>
//           </p>
//         )}
//       </div>
//     )
//   }

//   RecentNotes.css = style
//   return RecentNotes
// }) satisfies QuartzComponentConstructor
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

// 1. FolderContent가 사용하는 PageList와 스타일을 가져옵니다.
import { PageList, SortFn } from "./PageList"
import style from "./styles/listPage.scss" // recentNotes.scss 대신 listPage.scss 사용

// 2. PageList의 CSS를 병합하기 위해 concatenateResources를 가져옵니다.
import { concatenateResources } from "../util/resources"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean // PageList가 이 옵션을 직접 지원하지 않을 수 있습니다.
  filter: (f: QuartzPluginData) => boolean
  sort: SortFn // PageList와 타입을 맞추기 위해 SortFn 사용
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: (f1: QuartzPluginData, f2: QuartzPluginData): number => {
    // 기존 정렬 로직 (created date 기준)
    const d1 = f1.dates?.created?.getTime() ?? 0
    const d2 = f2.dates?.created?.getTime() ?? 0

    if (d2 !== d1) {
      return d2 - d1
    } // 날짜가 같으면 제목순

    const t1 = f1.frontmatter?.title ?? f1.slug ?? ""
    const t2 = f2.frontmatter?.title ?? f2.slug ?? ""
    return t1.localeCompare(t2)
  },
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = (props: QuartzComponentProps) => {
    const { allFiles, fileData, displayClass, cfg } = props // 3. 데이터 로직은 RecentNotes의 것을 그대로 사용합니다.

    // (필터링, 정렬, 개수 제한)
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)

    // 4. PageList에 넘겨줄, 최종적으로 잘라낸 페이지 목록
    const pagesToShow = pages.slice(0, opts.limit)

    return (
      // 5. FolderContent가 사용하는 'page-listing' 클래스를 적용합니다.
      <div class={classNames(displayClass, "page-listing", "recent-notes")}>
                <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        {/* 6. <ul> 대신 PageList 컴포넌트를 사용합니다. */}
        <div>
          <PageList
            {...props} // fileData, cfg 등 PageList가 필요한 props 전달
            allFiles={pagesToShow} // 💥 핵심: 필터링/정렬/제한된 목록을 allFiles로 덮어쓰기
          />
        </div>
        {/* 7. '더 보기' 링크는 그대로 유지합니다. */}       {" "}
        {opts.linkToMore && remaining > 0 && (
          <p>
                       {" "}
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
                           {" "}
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })} {" "}
            </a>
                     {" "}
          </p>
        )}
             {" "}
      </div>
    )
  }

  // 8. FolderContent와 동일하게 PageList의 CSS를 포함시킵니다.
  RecentNotes.css = concatenateResources(style, PageList.css)
  return RecentNotes
}) satisfies QuartzComponentConstructor
