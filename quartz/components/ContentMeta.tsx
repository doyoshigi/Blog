import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: false,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    const slug = fileData.slug

    if (text && slug !== "index" && slug !== "all-posts") {
      const segments: (string | JSX.Element)[] = []
      const { dates } = fileData

      if (dates) {
        if (dates.created) {
          segments.push(
            <span class="created">
              📄 created: <Date date={dates.created} locale={cfg.locale} />
            </span>,
          )
        } // Modified 날짜 표시 (created와 다를 경우에만)

        if (dates.modified && dates.created?.getTime() !== dates.modified?.getTime()) {
          segments.push(
            <span class="modified">
              📝 modified: <Date date={dates.modified} locale={cfg.locale} />
            </span>,
          )
        }
      }
      // if (fileData.dates) {
      //   segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      // }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
