// UI translation dictionary
export const labels = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.articles': 'Articles',
    'nav.about': 'About',
    // Search
    'search.placeholder': 'Search…',
    'search.shortcut': 'Ctrl K',
    // Lang
    'lang.en': 'EN',
    'lang.pt': 'PT',
    // Sidebar
    'sidebar.categories': 'Categories',
    'sidebar.onThisPage': 'On this page',
    'sidebar.tags': 'Tags',
    'sidebar.archive': 'Archive',
    // Footer
    'footer.copy': `© ${new Date().getFullYear()} IziBlog. All rights reserved.`,
    'footer.links': 'RSS · GitHub',
    // Pagination
    'pagination.page': 'Page',
    'pagination.of': 'of',
    'pagination.next': 'Next →',
    'pagination.prev': '← Previous',
    // Post
    'post.readTime': 'min read',
    'post.tldr': 'TL;DR',
    'post.related': 'Related posts',
    'post.breadcrumbHome': 'Home',
    'post.breadcrumbArticles': 'Articles',
    // Home
    'home.title': 'IziBlog',
    'home.description': 'A simple, SEO-first Astro template for technical blogs.',
    'home.browseArticles': 'Browse articles →',
    'home.exploreTags': 'Explore tags →',
    'home.aboutLink': 'About →',
    'home.featuredPosts': 'Featured posts',
    'home.recentPosts': 'Recent posts',
    'home.viewAll': 'View all articles →',
    // Pages
    'archive.title': 'Archive',
    'archive.desc': 'All posts sorted by year.',
    'tags.title': 'Tags',
    'tags.desc': 'Browse posts by topic.',
    'articles.title': 'Articles',
    'articles.desc': 'Technology, code and career. No fluff, no clickbait.',
    'about.title': 'About',
    'tag.postsTagged': 'article{s} tagged with',
    '404.title': 'Page Not Found',
    '404.message': 'The page you are looking for does not exist.',
    '404.backHome': '← Back to Home',
    // Cookie
    'cookie.title': 'Cookie Preferences',
    'cookie.description': 'We use cookies to enhance your experience. You can choose which categories to allow.',
    'cookie.acceptAll': 'Accept all',
    'cookie.rejectNonEssential': 'Reject non-essential',
    'cookie.manage': 'Manage preferences',
    'cookie.necessary': 'Necessary',
    'cookie.analytics': 'Analytics',
    'cookie.comments': 'Comments',
    'cookie.marketing': 'Marketing',
    'cookie.save': 'Save preferences',
  },
  pt: {
    // Nav
    'nav.home': 'Início',
    'nav.articles': 'Artigos',
    'nav.about': 'Sobre',
    // Search
    'search.placeholder': 'Pesquisar…',
    'search.shortcut': 'Ctrl K',
    // Lang
    'lang.en': 'EN',
    'lang.pt': 'PT',
    // Sidebar
    'sidebar.categories': 'Categorias',
    'sidebar.onThisPage': 'Nesta página',
    'sidebar.tags': 'Tags',
    'sidebar.archive': 'Arquivo',
    // Footer
    'footer.copy': `© ${new Date().getFullYear()} IziBlog. Todos os direitos reservados.`,
    'footer.links': 'RSS · GitHub',
    // Pagination
    'pagination.page': 'Página',
    'pagination.of': 'de',
    'pagination.next': 'Próxima →',
    'pagination.prev': '← Anterior',
    // Post
    'post.readTime': 'min de leitura',
    'post.tldr': 'Resumo',
    'post.related': 'Posts relacionados',
    'post.breadcrumbHome': 'Início',
    'post.breadcrumbArticles': 'Artigos',
    // Home
    'home.title': 'IziBlog',
    'home.description': 'A simple, SEO-first Astro template for technical blogs.',
    'home.browseArticles': 'Ver artigos →',
    'home.exploreTags': 'Explorar tags →',
    'home.aboutLink': 'Sobre →',
    'home.featuredPosts': 'Artigos em destaque',
    'home.recentPosts': 'Artigos recentes',
    'home.viewAll': 'Ver todos os artigos →',
    // Pages
    'archive.title': 'Arquivo',
    'archive.desc': 'Todos os posts ordenados por ano.',
    'tags.title': 'Tags',
    'tags.desc': 'Explore posts por tópico.',
    'articles.title': 'Artigos',
    'articles.desc': 'Tecnologia, código e carreira. Sem enrolação, sem clickbait.',
    'about.title': 'Sobre',
    'tag.postsTagged': 'artigo{s} com a tag',
    '404.title': 'Página Não Encontrada',
    '404.message': 'A página que você está procurando não existe.',
    '404.backHome': '← Voltar ao Início',
    // Cookie
    'cookie.title': 'Preferências de Cookies',
    'cookie.description': 'Usamos cookies para melhorar sua experiência. Você pode escolher quais categorias permitir.',
    'cookie.acceptAll': 'Aceitar tudo',
    'cookie.rejectNonEssential': 'Rejeitar não-essenciais',
    'cookie.manage': 'Gerenciar preferências',
    'cookie.necessary': 'Necessários',
    'cookie.analytics': 'Análises',
    'cookie.comments': 'Comentários',
    'cookie.marketing': 'Marketing',
    'cookie.save': 'Salvar preferências',
  },
} as const;

export type Lang = 'en' | 'pt';
export const defaultLang = 'en' as const;

export function t(key: keyof typeof labels.en, lang: Lang = defaultLang): string {
  return labels[lang][key] || labels.en[key] || key;
}

export function getLangFromUrl(url: URL): Lang {
  const parts = url.pathname.split('/').filter(Boolean);
  return parts[0] === 'pt' ? 'pt' : 'en';
}

export function useTranslations(lang: Lang) {
  return (key: keyof typeof labels.en) => t(key, lang);
}

/**
 * Switch a pathname from one language to another.
 * Example: getLocalePath('/en/articles/foo', 'pt') -> '/pt/articles/foo'
 */
export function getLocalePath(path: string, targetLang: Lang): string {
  if (path === '/' || path === '') return `/${targetLang}/`;
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'pt') {
    parts[0] = targetLang;
  } else {
    // No lang prefix present, prepend targetLang
    parts.unshift(targetLang);
  }
  return '/' + parts.join('/') + '/';
}
