import React, { useEffect, useRef, useState } from 'react';
import Feed from '../components/Feed';
import { FeedType } from '../interfaces/feed.interface';

export default function ArticlesFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastElement, setLastElement] = useState(null);
  const [feeds, setFeeds] = useState<FeedType[]>([]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        setCurrentPage((page) => page + 1);
      }
    }),
  );

  useEffect(() => {
    if (!isLastPage) {
      const getFeeds = async () => {
        const response = await (
          await fetch(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${currentPage}`)
        ).json();
        const feedsData = response.nodes.map((feed: { node: FeedType }) => feed.node);
        if (!feedsData.length) {
          setIsLastPage(true);
          return;
        }
        setFeeds((existingFeeds) => [...existingFeeds, ...feedsData]);
      };
      getFeeds();
    }
  }, [currentPage, isLastPage]);

  useEffect(() => {
    const currentObserver = observer.current;
    if (lastElement) {
      currentObserver.observe(lastElement!);

      return () => {
        currentObserver.unobserve(lastElement!);
      };
    }
  }, [lastElement, observer]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-11 py-12">
      {feeds.length > 0 &&
        feeds.map((feed: FeedType, i: number) => (
          <Feed
            key={`${feed.path}-${i}`}
            feed={feed}
            feedRef={i === feeds.length - 1 && !isLastPage ? setLastElement : null}
          />
        ))}
    </div>
  );
}
