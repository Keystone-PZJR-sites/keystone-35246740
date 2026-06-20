// Gallery
export { BlogGalleryHeader } from './BlogGalleryHeader';
export { BlogFeatureHero } from './BlogFeatureHero';
export { BlogHighlightCard } from './BlogHighlightCard';
export { BlogRecentList } from './BlogRecentList';
export { BlogTopicBand } from './BlogTopicBand';
export { BlogCategorySection } from './BlogCategorySection';
export { BlogAllTopics } from './BlogAllTopics';

// Shared gallery + related grids
export { BlogPostCard } from './BlogPostCard';
export { BlogFeaturedCard } from './BlogFeaturedCard';
export { BlogFilterBar } from './BlogFilterBar';
export { BlogPagination } from './BlogPagination';

// Post detail
export { BlogBreadcrumb } from './BlogBreadcrumb';
export type { BreadcrumbItem } from './BlogBreadcrumb';
export { BlogPostSidebar } from './BlogPostSidebar';
export { BlogArticleToc } from './BlogArticleToc';
export { BlogPromoCard } from './BlogPromoCard';
export { BlogAuthorBio } from './BlogAuthorBio';
export type { BlogSocialLinks } from './BlogAuthorBio';
export { ArticleBody } from './ArticleBody';

// Utils
export {
  getFeaturedImage,
  getAuthorAvatar,
  formatDate,
  estimateReadingTime,
  extractUniqueTags,
  tagsWithCounts,
  topTagsByCount,
  postsForTag,
  byNewestFirst,
  filterPosts,
  getPageNumbers,
  extractHeadings,
  slugify,
  createSlugger,
  stripInlineMarkdown,
} from './utils';
export type { TagWithCount, TocHeading } from './utils';
