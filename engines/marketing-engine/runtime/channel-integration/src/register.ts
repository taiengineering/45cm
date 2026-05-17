import { channelRegistry } from './index';
import { LinkedInAdapter } from './adapters/linkedin';
import { FacebookAdapter } from './adapters/facebook';
import { NaverBlogAdapter } from './adapters/naver-blog';
import { InstagramAdapter } from './adapters/instagram';
import { YouTubeAdapter } from './adapters/youtube';
import { XTwitterAdapter } from './adapters/x-twitter';
import { ThreadsAdapter } from './adapters/threads';

export function registerAllAdapters() {
  channelRegistry.register('linkedin', new LinkedInAdapter());
  channelRegistry.register('facebook', new FacebookAdapter());
  channelRegistry.register('naver_blog', new NaverBlogAdapter());
  channelRegistry.register('instagram', new InstagramAdapter());
  channelRegistry.register('youtube', new YouTubeAdapter());
  channelRegistry.register('x_twitter', new XTwitterAdapter());
  channelRegistry.register('threads', new ThreadsAdapter());
}
