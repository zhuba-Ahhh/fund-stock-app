import React, { useMemo, useState } from 'react';
import { Card, List } from 'antd-mobile';
import { UpOutline, DownOutline } from 'antd-mobile-icons';
import { TEXTS } from '../../../common/texts';
import styles from '../FundDetail.module.less';
import type { FundItem } from '../../../types';
import { renderColor, renderSign } from '../utils';

interface Props {
  fund: FundItem;
}

export const IndustryCard: React.FC<Props> = ({ fund }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');

  const sortedIndustries = useMemo(() => {
    if (!fund.data.relatedIndustryV2) return [];
    const list = [...fund.data.relatedIndustryV2];
    if (sortOrder === 'default') return list;
    
    return list.sort((a, b) => {
      return sortOrder === 'asc' ? a.change - b.change : b.change - a.change;
    });
  }, [fund.data.relatedIndustryV2, sortOrder]);

  const toggleSort = () => {
    setSortOrder(current => {
      if (current === 'default') return 'desc';
      if (current === 'desc') return 'asc';
      return 'default';
    });
  };

  if (!fund.data.relatedIndustryV2 || fund.data.relatedIndustryV2.length === 0) return null;

  return (
    <Card
      title={
        <div className={styles['card-header-with-sort']} onClick={toggleSort}>
          <span>{TEXTS.FUND_DETAIL.RELATED_INDUSTRY}</span>
          <span className={styles['sort-icon']}>
            {sortOrder === 'default' && <span style={{ fontSize: 12, color: '#999' }}>{TEXTS.COMMON.SORT}</span>}
            {sortOrder === 'asc' && <UpOutline />}
            {sortOrder === 'desc' && <DownOutline />}
          </span>
        </div>
      }
      className={styles['section-card']}
    >
      <List>
        {sortedIndustries.map((item, index) => (
          <List.Item key={index} extra={
            <span style={{ color: renderColor(item.change) }}>{renderSign(item.change)}{(item.change * 100).toFixed(2)}%</span>
          }>
            {item.themeName}
          </List.Item>
        ))}
      </List>
    </Card>
  );
};
