import React from 'react';
import { Grid } from 'antd-mobile';
import { TEXTS } from '../../../common/texts';
import type { MarketIndex } from '../../../types';
import styles from '../Home.module.less';
import { renderColor, renderSign } from '../utils';

interface Props {
  marketIndexes: MarketIndex[];
}

export const MarketSection: React.FC<Props> = ({ marketIndexes }) => {
  return (
    <div className={styles['market-section']}>
      <h2 className={styles['section-title']}>{TEXTS.HOME.MARKET_INDEX}</h2>
      <Grid columns={3} gap={8}>
        {marketIndexes.map((index) => (
          <Grid.Item key={index.code}>
            <div className={styles['market-card']}>
              <div className={styles['market-name']}>{index.name}</div>
              <div className={styles['market-price']} style={{ color: renderColor(index.percent) }}>
                {index.current}
              </div>
              <div className={styles['market-change']} style={{ color: renderColor(index.percent) }}>
                {renderSign(index.percent)}{index.percent}%
              </div>
            </div>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
};
