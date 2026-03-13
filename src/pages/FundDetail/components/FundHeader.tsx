import React from 'react';
import { Grid } from 'antd-mobile';
import { TEXTS } from '../../../common/texts';
import styles from '../FundDetail.module.less';
import type { FundItem } from '../../../types';
import { renderColor, renderSign } from '../utils';

interface Props {
  fund: FundItem;
}

export const FundHeader: React.FC<Props> = ({ fund }) => {
  return (
    <div className={styles['header-card']}>
      <div className={styles['fund-code-tag']}>{fund.code}</div>
      <div className={styles['earning-display']} style={{ color: renderColor(fund.dailyYield) }}>
        <div className={styles['earning-value']}>{renderSign(fund.dailyYield)}{(fund.dailyYield * 100).toFixed(2)}%</div>
        <div className={styles['earning-label']}>{TEXTS.COMMON.DAILY_YIELD}</div>
      </div>
      <Grid columns={3} gap={8}>
        <Grid.Item>
          <div className={styles['stat-item']}>
            <div className={styles['stat-value']}>{fund.nav}</div>
            <div className={styles['stat-label']}>{TEXTS.COMMON.NAV} ({fund.updateNavTime.split('-').slice(1).join('-')})</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles['stat-item']}>
            <div className={styles['stat-value']} style={{ color: renderColor(fund.currentEarning) }}>{renderSign(fund.currentEarning)}{fund.currentEarning.toFixed(2)}</div>
            <div className={styles['stat-label']}>{TEXTS.COMMON.DAILY_EARN}</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles['stat-item']}>
            <div className={styles['stat-value']} style={{ color: renderColor(fund.sumEarning) }}>{renderSign(fund.sumEarning)}{fund.sumEarning.toFixed(2)}</div>
            <div className={styles['stat-label']}>{TEXTS.COMMON.TOTAL_EARN}</div>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
};
