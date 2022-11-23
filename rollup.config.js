import builder from '@daybrush/builder';
import compat from 'rollup-plugin-react-compat';

const resolveReactCompat = compat({
  useReactCompat: true,
  resolveCompat: true,
});

export default builder([
  {
    name: 'Guides',
    input: 'src/index.ts',
    output: './dist/guides.min.js',
    plugins: [resolveReactCompat],
    uglify: true,
  },
  {
    name: 'Guides',
    input: 'src/index.ts',
    output: './dist/guides.js',
    plugins: [resolveReactCompat],
    uglify: false,
  },
]);
