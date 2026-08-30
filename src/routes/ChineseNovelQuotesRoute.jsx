import React from 'react';
import WuxiaQuotesApp from '../components/wuxia/WuxiaQuotesApp';
import Seo from '../components/Seo';

export default function ChineseNovelQuotesRoute() {
  return (
    <>
      <Seo
        title="Popular Sayings from Chinese Novels & Wuxia Lore"
        description="Discover legendary sayings, cultivator quotes, and martial arts wisdom categorized by mood from popular Chinese Wuxia and Xianxia web novels."
      />
      <WuxiaQuotesApp />
    </>
  );
}
