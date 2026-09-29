import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'music.song' | 'music.album' | 'profile';
  schemaData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Gulzar Music World – Chhattisgarhi Music & Studio Platform',
  description = 'Listen to Chhattisgarhi Songs, Panthi, Karma, Dadariya, Bhakti Geet, Album Songs and book professional recording studio services in Raipur Chhattisgarh.',
  schemaData
}) => {
  useEffect(() => {
    // Dynamic document title
    document.title = title;

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Schema JSON-LD injection if provided
    let scriptTag: HTMLScriptElement | null = null;
    if (schemaData) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(schemaData);
      document.head.appendChild(scriptTag);
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [title, description, schemaData]);

  return null;
};
