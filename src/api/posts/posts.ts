import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Post = any;

const { posts } = yaml.load(
  fs.readFileSync(path.join(__dirname, 'fixtures.yaml'), 'utf8')
) as { posts: Post[] };

export async function getPosts(): Promise<Post[]> {
  if (Array.isArray(posts)) {
    return posts;
  }
  throw new Error('Invalid posts backend');
}
