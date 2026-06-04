import { Helmet } from 'react-helmet-async';

const DEFAULT_IMAGE = 'https://kreeyadesign.com/images/logo.webp';
const DEFAULT_DESCRIPTION = 'Kreeya Design delivers UI/UX, branding, web design, and digital strategy services for startups and enterprises seeking growth and lasting brand impact.';
const DEFAULT_KEYWORDS = 'UI UX design agency, branding agency, web design company, app design services, digital marketing, creative agency, design strategy';
const DEFAULT_TWITTER_CREATOR = '@kreeyadesignofficial';

const SeoTags = ({
     title,
     description,
     url,
     image,
     keywords,
     canonical,
     noIndex = false,
}) => {
     const metaTitle = title || 'Kreeya Design | UI UX, Branding & Web Design Agency';
     const metaDescription = description || DEFAULT_DESCRIPTION;
     const metaUrl = url || 'https://kreeyadesign.com/';
     const metaImage = image || DEFAULT_IMAGE;
     const metaKeywords = keywords || DEFAULT_KEYWORDS;

     return (
          <Helmet>
               <title>{metaTitle}</title>
               <meta name="description" content={metaDescription} />
               <meta name="keywords" content={metaKeywords} />
               <meta property="og:title" content={metaTitle} />
               <meta property="og:description" content={metaDescription} />
               <meta property="og:url" content={metaUrl} />
               <meta property="og:image" content={metaImage} />
               <meta property="og:type" content="website" />
               <meta name="twitter:card" content="summary_large_image" />
               <meta name="twitter:title" content={metaTitle} />
               <meta name="twitter:description" content={metaDescription} />
               <meta name="twitter:image" content={metaImage} />
               <meta name="twitter:creator" content={DEFAULT_TWITTER_CREATOR} />
               {canonical && <link rel="canonical" href={canonical} />}
               {noIndex && <meta name="robots" content="noindex,follow" />}
          </Helmet>
     );
};

export default SeoTags;
