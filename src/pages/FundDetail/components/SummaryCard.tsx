import React from 'react';
import { EyeOutline } from 'antd-mobile-icons';
import { TEXTS } from '../../../common/texts';
import styles from '../FundDetail.module.less';
import type { FundItem } from '../../../types';
import { renderColor, renderSign } from '../utils';

interface Props {
  fund: FundItem;
}

export const SummaryCard: React.FC<Props> = ({ fund }) => {
  return (
    <div className={styles['summary-card']}>
      <div className={styles['summary-row']}>
        <div className={styles['summary-item']}>
          <div className={styles['summary-label']}>
            {TEXTS.COMMON.TOTAL_ASSET} <EyeOutline fontSize={14} />
          </div>
          <div className={styles['summary-value']}>
            {fund.money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className={styles['summary-item']} onClick={() => { }}>
          <div className={styles['summary-label']}>
            {TEXTS.COMMON.DAILY_INCOME}
          </div>
          <div className={styles['summary-value']} style={{ color: renderColor(fund.currentEarning) }}>
            {renderSign(fund.currentEarning)}{fund.currentEarning.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
