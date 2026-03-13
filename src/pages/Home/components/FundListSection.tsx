import React, { useMemo, useState } from 'react';
import { UpOutline, DownOutline } from 'antd-mobile-icons';
import { TEXTS } from '../../../common/texts';
import type { FundItem } from '../../../types';
import styles from '../Home.module.less';
import { renderColor, renderSign } from '../utils';

type SortField = 'sector' | 'daily' | 'holding';
type SortOrder = 'asc' | 'desc' | 'default';

interface Props {
  fundList: FundItem[];
  onFundClick: (fund: FundItem) => void;
}

export const FundListSection: React.FC<Props> = ({ fundList, onFundClick }) => {
  const [sortField, setSortField] = useState<SortField>('daily');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  const sortedFundList = useMemo(() => {
    if (sortOrder === 'default') return fundList;

    return [...fundList].sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      if (sortField === 'sector') {
        valA = a.data.relatedIndustryV2[0]?.change || 0;
        valB = b.data.relatedIndustryV2[0]?.change || 0;
      } else if (sortField === 'daily') {
        valA = a.currentEarning;
        valB = b.currentEarning;
      } else if (sortField === 'holding') {
        valA = a.earnings;
        valB = b.earnings;
      }

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
  }, [fundList, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(current => {
        if (current === 'default') return 'desc';
        if (current === 'desc') return 'asc';
        return 'default';
      });
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field || sortOrder === 'default') {
      return <span className={styles['sort-icon-placeholder']} />;
    }
    return sortOrder === 'asc' ? <UpOutline fontSize={10} /> : <DownOutline fontSize={10} />;
  };

  return (
    <div className={styles['fund-section']}>
      <div className={styles['sort-bar']}>
        <div className={styles['sort-item']}>
          {TEXTS.HOME.SORT_COMMON}
        </div>
        <div className={styles['sort-item']} onClick={() => handleSort('sector')}>
          {TEXTS.HOME.SORT_SECTOR} {renderSortIcon('sector')}
        </div>
        <div className={styles['sort-item']} onClick={() => handleSort('daily')}>
          {TEXTS.HOME.SORT_DAILY} {renderSortIcon('daily')}
        </div>
        <div className={styles['sort-item']} onClick={() => handleSort('holding')}>
          {TEXTS.HOME.SORT_HOLD} {renderSortIcon('holding')}
        </div>
      </div>

      <div className={styles['fund-list']}>
        {sortedFundList.map((fund) => {
          const sector = fund.data.relatedIndustryV2[0];
          const dailyPercent = fund.dailyYield * 100;
          const holdingPercent = (fund.earnings / fund.headMoney) * 100; // Approx holding percent
          const bgColor = fund.currentEarning >= 0 ? 'rgba(255, 240, 240, 0.5)' : 'rgba(240, 255, 240, 0.5)';

          return (
            <div
              key={fund._id}
              className={styles['fund-item']}
              style={{ backgroundColor: bgColor }}
              onClick={() => onFundClick(fund)}
            >
              <div className={styles['fund-col-main']}>
                <div className={styles['fund-name']}>{fund.data.name}</div>
                <div className={styles['fund-tags']}>
                  {fund.isUpdate && <span className={styles['update-tag']}>{TEXTS.COMMON.UPDATED}</span>}
                  <span className={styles['fund-money']}>¥ {fund.money.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles['fund-col-sector']}>
                {sector && (
                  <>
                    <div className={styles['sector-change']} style={{ color: renderColor(sector.change) }}>
                      {renderSign(sector.change)}{(sector.change * 100).toFixed(2)}%
                    </div>
                    <div className={styles['sector-name']}>{sector.themeName}</div>
                  </>
                )}
              </div>

              <div className={styles['fund-col-daily']}>
                <div className={styles['amount']} style={{ color: renderColor(fund.currentEarning) }}>
                  {renderSign(fund.currentEarning)}{fund.currentEarning.toFixed(2)}
                </div>
                <div className={styles['percent']} style={{ color: renderColor(fund.dailyYield) }}>
                  {renderSign(fund.dailyYield)}{dailyPercent.toFixed(2)}%
                </div>
              </div>

              <div className={styles['fund-col-holding']}>
                <div className={styles['amount']} style={{ color: renderColor(fund.earnings) }}>
                  {renderSign(fund.earnings)}{fund.earnings.toFixed(2)}
                </div>
                <div className={styles['percent']} style={{ color: renderColor(fund.earnings) }}>
                  {renderSign(fund.earnings)}{holdingPercent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
