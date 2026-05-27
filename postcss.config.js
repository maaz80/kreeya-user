import purgecss from '@fullhuman/postcss-purgecss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
     plugins: [
          tailwindcss(),
          autoprefixer(),
          ...(process.env.NODE_ENV === 'production' ? [
               cssnano({
                    preset: ['default', {
                         discardComments: { removeAll: true },
                         normalizeWhitespace: true,
                    }],
               }),
               purgecss({
                    content: [
                         './index.html',
                         './src/**/*.jsx',
                         './src/**/*.js'
                    ],
                    // Extract Tailwind classes correctly
                    defaultExtractor: content => {
                         const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
                         const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
                         return broadMatches.concat(innerMatches);
                    }
               })
          ] : [])
     ]
}