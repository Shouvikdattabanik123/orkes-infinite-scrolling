import React from 'react';
import { FeedType } from '../interfaces/feed.interface';

export default function ArticlesFeed({ feed, feedRef }: { feed: FeedType; feedRef: any }) {
  return (
    <div className='flex' key={feed.path} ref={feedRef}>
      <img className="w-64 h-40 mx-4 rounded-3xl" src={feed.field_photo_image_section} alt={feed.path} />
      <span className='w-72 mt-1 text-left'>{feed.title}</span>
    </div>
  );
}
