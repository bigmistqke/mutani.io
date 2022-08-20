import { buildConfig } from 'payload/config';
import Users from './collections/Users';
import Media from './collections/Media';
import Projects from './collections/Projects';
import Friends from './collections/Friends';
import About from './globals/About';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  globals: [
    About
  ],
  collections: [
    Users,
    Media,
    Projects,
    Friends
  ],
});
