import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import Giscus from "./quartz/components/Giscus"
import { isFolderPath, FullSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
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
  afterBody: [
    RecentNotesForIndex, // 기존 컴포넌트 유지
    AllRecentNotes, // 기존 컴포넌트 유지
    // 3. 여기에 ConditionalRender와 Giscus를 추가합니다.
    Component.ConditionalRender({
      component: Component.Comments({
        provider: "giscus",
        options: {
          repo: "doyoshigi/Blog",
          repoId: "R_kgDOQVdHGw",
          category: "Announcements",
          categoryId: "DIC_kwDOQVdHG84Cx0Ix",
          // 테마나 언어를 강제하고 싶다면 여기에 추가
          // theme: "dark",
          // lang: "ko",
        },
      }),
      // 4. 'index', 'all-posts', '404', '폴더' 페이지에서 숨기는 조건
      condition: (page) => {
        const slug = page.fileData.slug
        if (!slug) {
          return false
        }

        // 이 레이아웃은 'list' 페이지(폴더)에는 적용되지 않으므로
        // isFolderPath 검사는 사실상 필요 없지만, 명시적으로 남겨둡니다.
        const isFolder = isFolderPath(slug as FullSlug)
        const isIndex = slug === "index"
        const isAllPosts = slug === "all-posts"
        const is404 = slug === "404"

        return !isFolder && !isIndex && !isAllPosts && !is404
      },
    }),
  ],
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
