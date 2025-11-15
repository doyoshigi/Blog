// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { classNames } from "../util/lang"
// // @ts-ignore
// import script from "./scripts/comments.inline"

// type Options = {
//   provider: "giscus"
//   options: {
//     repo: `${string}/${string}`
//     repoId: string
//     category: string
//     categoryId: string
//     themeUrl?: string
//     lightTheme?: string
//     darkTheme?: string
//     mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
//     strict?: boolean
//     reactionsEnabled?: boolean
//     inputPosition?: "top" | "bottom"
//     lang?: string
//   }
// }

// function boolToStringBool(b: boolean): string {
//   return b ? "1" : "0"
// }

// export default ((opts: Options) => {
//   const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
//     // check if comments should be displayed according to frontmatter
//     const disableComment: boolean =
//       typeof fileData.frontmatter?.comments !== "undefined" &&
//       (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
//     if (disableComment) {
//       return <></>
//     }

//     return (
//       <div
//         class={classNames(displayClass, "giscus")}
//         data-repo={opts.options.repo}
//         data-repo-id={opts.options.repoId}
//         data-category={opts.options.category}
//         data-category-id={opts.options.categoryId}
//         data-mapping={opts.options.mapping ?? "url"}
//         data-strict={boolToStringBool(opts.options.strict ?? true)}
//         data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
//         data-input-position={opts.options.inputPosition ?? "bottom"}
//         data-light-theme={opts.options.lightTheme ?? "light"}
//         data-dark-theme={opts.options.darkTheme ?? "dark"}
//         data-theme-url={
//           opts.options.themeUrl ?? `https://${cfg.baseUrl ?? "example.com"}/static/giscus`
//         }
//         data-lang={opts.options.lang ?? "en"}
//       ></div>
//     )
//   }

//   Comments.afterDOMLoaded = script

//   return Comments
// }) satisfies QuartzComponentConstructor<Options>
// 💻 파일: quartz/components/Comments.tsx
// 아래 코드로 파일 전체를 교체하세요.

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

// [1] 'Options' 타입을 default.tsx에서 보낸 값과 일치시킵니다.
type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    theme?: string // 'lightTheme/darkTheme' 대신 'theme'을 받습니다.
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: string | "0" | "1" | boolean // 'strict'를 string 또는 boolean으로 받을 수 있게 합니다.
    reactionsEnabled?: string | "0" | "1" | boolean
    emitMetadata?: string | "0" | "1" | boolean
    inputPosition?: "top" | "bottom"
    lang?: string
    crossorigin?: string // 'crossorigin' 추가
  }
}

// [2] boolToStringBool을 더 유연하게 만듭니다 (string "0"이나 false를 "0"으로).
function normalizeBool(b: string | boolean | undefined, defaultVal: "0" | "1"): string {
  if (b === undefined || b === null) return defaultVal
  if (b === "0" || b === false) return "0"
  if (b === "1" || b === true) return "1"
  // "true"나 "false" 같은 문자열도 boolean으로 변환 시도
  if (typeof b === "string") {
    return b.toLowerCase() === "true" || b === "1" ? "1" : "0"
  }
  return defaultVal
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, fileData, cfg }: QuartzComponentProps) => {
    // check if comments should be displayed according to frontmatter
    const disableComment: boolean =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")
    if (disableComment) {
      return <></>
    }

    // [3] 'return' 문을 수정하여 올바른 data 속성을 사용합니다.
    return (
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        // 'pathname'을 기본값으로 수정
        data-mapping={opts.options.mapping ?? "pathname"}
        // 'strict'가 "0" (false)을 기본값으로 하도록 수정 (404 오류 해결)
        data-strict={normalizeBool(opts.options.strict, "0")}
        // 'reactionsEnabled'가 "1" (true)을 기본값으로 하도록 수정
        data-reactions-enabled={normalizeBool(opts.options.reactionsEnabled, "1")}
        data-emit-metadata={normalizeBool(opts.options.emitMetadata, "0")}
        data-input-position={opts.options.inputPosition ?? "bottom"}
        // 'data-theme'을 사용하고 'preferred_color_scheme'을 기본값으로 수정 (css 오류 해결)
        data-theme={opts.options.theme ?? "preferred_color_scheme"}
        // 'data-lang'을 사용하고 'ko'를 기본값으로 수정
        data-lang={opts.options.lang ?? "ko"}
        // 'crossorigin' 추가
        data-crossorigin={opts.options.crossorigin ?? "anonymous"}
      ></div>
    )
  }

  Comments.afterDOMLoaded = script

  return Comments
}) satisfies QuartzComponentConstructor<Options>
