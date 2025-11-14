import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "../styles/listPage.scss"
import { PageList } from "./PageList"
import { Root } from "hast"
import { htmlToJsx } from "../util/jsx"
// import { i18n } from "../i18n" // 👈 1. i18n을 사용하지 않으므로 이 줄을 삭제하거나 주석 처리합니다.
import { ComponentChildren } from "preact"
import { concatenateResources } from "../util/resources"
import RecentNotes from "./RecentNotes" // 👈 PageList 대신 RecentNotes를 가져옵니다.

// 1. FolderContentOptions 대신 AllPostsOptions로 변경
interface AllPostsOptions {
  title: string
  limit: number
  showTags: boolean
}

// 2. 기본 옵션을 AllPosts에 맞게 변경
const defaultOptions: AllPostsOptions = {
  title: "All Posts", // 👈 2. 이 기본 제목이 항상 사용됩니다.
  limit: 9999, // 👈 핵심: 모든 글을 보여주기 위해 매우 큰 숫자
  showTags: true,
}

// 3. export default 이름 변경 없음
export default ((opts?: Partial<AllPostsOptions>) => {
  const options: AllPostsOptions = { ...defaultOptions, ...opts }

  // 4. 컴포넌트 이름을 AllPosts로 변경
  const AllPosts: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, cfg } = props // cfg는 이제 i18n에 필요 없지만 일단 둡니다.

    // 5. 🛑 핵심: "all-posts" 페이지가 아니면 아무것도 렌더링하지 않습니다.
    if (fileData.slug !== "all-posts") {
      return null
    }

    // --- (FolderContent.tsx와 동일한 로직) ---
    // all-posts.md 파일의 본문 내용을 렌더링합니다.
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren
    // --- (여기까지 동일) ---

    //
    // 6. 💡💡💡 변경된 부분 💡💡💡
    // i18n 로직을 모두 제거하고, options에서 직접 제목을 가져옵니다.
    //
    const title = options.title // "All Posts"

    return (
      <div class="popover-hint">
        {/* all-posts.md의 본문 렌더링 */}
        <article class={classes}>{content}</article>

        {/* 7. 👈 FolderPage/PageList 로직 대신 RecentNotes 로직으로 대체 */}
        <div class="page-listing">
          {/* RecentNotes 컴포넌트를 호출하여 모든 글 목록을 렌더링합니다. */}
          {RecentNotes({
            ...options, // limit: 9999, showTags: true 전달
            title: title, // "All Posts" 제목 전달
            linkToMore: undefined, // "더 보기" 링크는 필요 없음
          })(props)}
        </div>
      </div>
    )
  }

  // 8. CSS 설정 (FolderContent와 동일하게 PageList의 CSS를 사용)
  AllPosts.css = concatenateResources(style, PageList.css)
  return AllPosts
}) satisfies QuartzComponentConstructor
