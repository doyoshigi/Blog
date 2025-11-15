import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import Giscus from "./quartz/components/Giscus"
import { isFolderPath, FullSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // [1] Giscus를 ConditionalRender로 감쌉니다.
    Component.ConditionalRender({
      // [2] 렌더링할 컴포넌트는 Comments입니다.
      component: Component.Comments({
        provider: "giscus",
        // [3] 사용자가 제공한 <script>의 모든 옵션을 여기에 전달합니다.
        options: {
          repo: "doyoshigi/Blog",
          repoId: "R_kgDOQVdHGw",
          category: "Announcements",
          categoryId: "DIC_kwDOQVdHG84Cx0Ix",
          mapping: "pathname",
          strict: "0",
          reactionsEnabled: "1",
          emitMetadata: "0",
          inputPosition: "bottom",
          theme: "dark", // 👈 'dark' 테마를 지정했습니다.
          lang: "ko",
          crossorigin: "anonymous", // 👈 이 옵션도 추가
        },
      }),
      // [4] 이전에 완성했던 'slug' 기반의 조건부 로직을 사용합니다.
      condition: (page) => {
        const slug = page.fileData.slug
        if (!slug) {
          return false
        }

        const isFolder = isFolderPath(slug as FullSlug)
        const isIndex = slug === "index"
        const isAllPosts = slug === "all-posts"
        const is404 = slug === "404"

        // 폴더/인덱스/all-posts/404가 아닐 때만 Giscus를 표시합니다.
        return !isFolder && !isIndex && !isAllPosts && !is404
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/jackyzha0/quartz",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

import RecentNotesForIndex from "./quartz/components/RecentNotesForIndex"
import AllRecentNotes from "./quartz/components/AllRecentNotes"

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  afterBody: [RecentNotesForIndex, AllRecentNotes],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  afterBody: [],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
