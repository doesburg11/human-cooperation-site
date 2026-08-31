// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from 'rehype-external-links';

function removeDuplicateEvolvedCooperationDoc(items) {
  return items.flatMap((item) => {
    if (
      item.type === 'doc'
      && item.id === 'evolved-cooperation/evolved-cooperation'
    ) {
      return [];
    }
    if (item.type === 'category') {
      return [
        {
          ...item,
          items: removeDuplicateEvolvedCooperationDoc(item.items),
        },
      ];
    }
    return [item];
  });
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Nature and Nurture of Cooperation and Competition',
  tagline: 'Exploring the roots of human actions',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://humanbehaviorpatterns.org',
  baseUrl: '/',
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/katex@0.16.33/dist/katex.min.css',
  ],

  organizationName: 'doesburg11',
  projectName: 'human-cooperation-site',
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        indexPages: false,
        searchBarShortcutHint: false,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: true,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const items = await defaultSidebarItemsGenerator(args);
            return removeDuplicateEvolvedCooperationDoc(items);
          },
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex, [rehypeExternalLinks, { target: false }]],
          editUrl: 'https://github.com/doesburg11/human-cooperation-site/edit/main/',
        },
        // BLOG REMOVED — no blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    mermaid: {
      options: {
        securityLevel: 'loose',
      },
    },
    navbar: {
      title: 'The Nature and Nurture of Cooperation and Competition',
      logo: {
        alt: 'Behavior Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/doesburg11',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub profile',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/peter-van-doesburg/',
            },
          ],
        },
        {
          title: 'Resources',
          className: 'footer-col--push-right',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/doesburg11',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Peter van Doesburg.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
