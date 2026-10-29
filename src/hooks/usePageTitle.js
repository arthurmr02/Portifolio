import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.ownerName}` : siteConfig.ownerName;
  }, [title]);
}
