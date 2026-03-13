import React from 'react';
import { Skeleton } from 'antd-mobile';
import styles from '../FundDetail.module.less';

export const SkeletonLoader: React.FC = () => (
  <div className={styles['skeleton-container']}>
    <Skeleton.Title animated style={{ height: 160, marginBottom: 20 }} />
    <Skeleton.Paragraph animated lineCount={4} style={{ marginBottom: 20 }} />
    <Skeleton.Paragraph animated lineCount={4} style={{ marginBottom: 20 }} />
    <Skeleton.Paragraph animated lineCount={6} />
  </div>
);
