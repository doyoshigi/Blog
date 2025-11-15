import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { VNode } from "preact"

function GiscusComponent(props: QuartzComponentProps): VNode | null {
  return (
    <script
      src="https://giscus.app/client.js"
      key="giscus-script"
      data-repo="doyoshigi/Blog"
      data-repo-id="R_kgDOQVdHGw"
      data-category="General"
      data-category-id="DIC_kwDOQVdHG84Cx0Iy"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="dark"
      data-lang="ko"
      crossOrigin="anonymous"
      async
    ></script>
  )
}

export default (() => {
  return GiscusComponent
}) satisfies QuartzComponentConstructor
