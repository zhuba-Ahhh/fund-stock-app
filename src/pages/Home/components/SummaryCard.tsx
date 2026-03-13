import React from 'react';
import { EyeOutline } from 'antd-mobile-icons';
import { TEXTS } from '../../../common/texts';
import styles from '../Home.module.less';
import { renderColor, renderSign } from '../utils';

interface Props {
  totalAssets: number;
  totalDailyIncome: number;
}

export const SummaryCard: React.FC<Props> = ({ totalAssets, totalDailyIncome }) => {
  return (
    <div className={styles['summary-card']}>
      <div className={styles['summary-row']}>
        <div className={styles['summary-item']}>
          <div className={styles['summary-label']}>
            {TEXTS.COMMON.TOTAL_ASSET} <EyeOutline fontSize={14} />
          </div>
          <div className={styles['summary-value']}>
            {totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className={styles['summary-item']}>
          <div className={styles['summary-label']}>
            {TEXTS.COMMON.DAILY_INCOME}
          </div>
          <div className={styles['summary-value']} style={{ color: renderColor(totalDailyIncome) }}>
            {renderSign(totalDailyIncome)}{totalDailyIncome.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
