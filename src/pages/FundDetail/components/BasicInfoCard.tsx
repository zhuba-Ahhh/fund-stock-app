import React from 'react';
import { Card, List } from 'antd-mobile';
import { TEXTS } from '../../../common/texts';
import styles from '../FundDetail.module.less';
import type { FundItem } from '../../../types';

interface Props {
  fund: FundItem;
}

export const BasicInfoCard: React.FC<Props> = ({ fund }) => {
  return (
    <Card title={TEXTS.FUND_DETAIL.BASIC_INFO} className={styles['section-card']}>
      <List>
        <List.Item extra={fund.data.investType}>{TEXTS.FUND_DETAIL.TYPE}</List.Item>
        <List.Item extra={fund.data.investStyle}>{TEXTS.FUND_DETAIL.STYLE}</List.Item>
        {fund.data.investWorth && <List.Item extra={fund.data.investWorth}>{TEXTS.FUND_DETAIL.WORTH}</List.Item>}
        {fund.data.risk && <List.Item extra={fund.data.risk}>{TEXTS.FUND_DETAIL.RISK}</List.Item>}
      </List>
    </Card>
  );
};
