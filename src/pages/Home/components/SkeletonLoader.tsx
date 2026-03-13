import React from 'react';
import { Skeleton, Grid } from 'antd-mobile';
import styles from '../Home.module.less';

export const SkeletonLoader: React.FC = () => (
  <div className={styles['skeleton-container']}>
    <Skeleton.Title animated style={{ height: 120, marginBottom: 20 }} />
    <Grid columns={3} gap={8}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Grid.Item key={i}>
          <Skeleton.Paragraph animated lineCount={3} style={{ height: 80 }} />
        </Grid.Item>
      ))}
    </Grid>
    <div style={{ marginTop: 20 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Skeleton.Paragraph key={i} animated lineCount={2} style={{ marginTop: 16 }} />
      ))}
    </div>
  </div>
);
