import React, { useEffect } from 'react';
import { HealthBlog } from '../components/HealthBlog';

export const BlogPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <HealthBlog previewMode={false} />
    </main>
  );
};
