import React from 'react';
import { Card, List } from 'antd-mobile';
import { TEXTS } from '../../../common/texts';
import styles from '../FundDetail.module.less';
import type { FundItem } from '../../../types';
import { renderColor, renderSign } from '../utils';

interface Props {
  fund: FundItem;
}

export const HoldingsCard: React.FC<Props> = ({ fund }) => {
  return (
    <Card title={TEXTS.FUND_DETAIL.HOLDINGS} className={styles['section-card']}>
      <List>
        <List.Item extra={fund.money.toFixed(2)}>{TEXTS.FUND_DETAIL.HOLDINGS}</List.Item>
        <List.Item extra={fund.headMoney.toFixed(2)}>{TEXTS.FUND_DETAIL.PRINCIPAL}</List.Item>
        <List.Item extra={<span style={{ color: renderColor(fund.earnings) }}>{renderSign(fund.earnings)}{fund.earnings.toFixed(2)}</span>}>
          {TEXTS.FUND_DETAIL.HOLD_EARNING}
        </List.Item>
      </List>
    </Card>
  );
};
