import BlogIndex from './BlogIndex';
import BlogNotFound from './BlogNotFound';
import BlogPost from './BlogPost';

/**
 * Blog entry point. Kept in its own module so the home page never pays for
 * the Markdown renderer or the blog components.
 */
export default function BlogRoutes({ route }) {
  if (route.name === 'blog') return <BlogIndex />;
  if (route.name === 'post') return <BlogPost slug={route.slug} />;
  return <BlogNotFound />;
}
