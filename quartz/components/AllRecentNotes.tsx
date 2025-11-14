import { QuartzComponent, QuartzComponentProps } from "./types"
import RecentNotes from "./RecentNotes"
import { SimpleSlug } from "../util/path"

const AllRecentNotes: QuartzComponent = (props: QuartzComponentProps) => {
  if (props.fileData.slug === "all-posts") {
    return RecentNotes({
      title: "Recent Posts",
      limit: 5,
      showTags: true,
      linkToMore: "all-posts" as SimpleSlug,
    })(props)
  }
  return null
}

export default AllRecentNotes
