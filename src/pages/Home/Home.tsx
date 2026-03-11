import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Toast } from 'antd-mobile';
import { UpOutline, DownOutline, EyeOutline } from 'antd-mobile-icons';
import { fetchMarketIndex, fetchFundList } from '../../services/api';
import type { MarketIndex, FundItem } from '../../types';
import styles from './Home.module.less';

type SortField = 'sector' | 'daily' | 'holding';
type SortOrder = 'asc' | 'desc' | 'default';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [marketIndexes, setMarketIndexes] = useState<MarketIndex[]>([]);
  const [fundList, setFundList] = useState<FundItem[]>([]);
  const [sortField, setSortField] = useState<SortField>('daily');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  useEffect(() => {
    const loadData = async () => {
      try {
        const indexData = await fetchMarketIndex();
        if (indexData.code === 200) {
          setMarketIndexes(indexData.data.slice(0, 6)); // Display top 6 indexes
        }

        const fundData = await fetchFundList();
        if (fundData.code === 200) {
          setFundList(fundData.data.list);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        Toast.show({
          icon: 'fail',
          content: 'Failed to load data',
        });
      }
    };

    loadData();
  }, []);

  const renderColor = (value: number) => {
    return value >= 0 ? '#e15241' : '#33b066';
  };

  const renderSign = (value: number) => {
    return value > 0 ? '+' : '';
  };

  const handleFundClick = (fund: FundItem) => {
    navigate(`/fund/${fund.code}`, { state: { fund } });
  };

  const totalAssets = useMemo(() => {
    return fundList.reduce((acc, curr) => acc + curr.money, 0);
  }, [fundList]);

  const totalDailyIncome = useMemo(() => {
    return fundList.reduce((acc, curr) => acc + curr.currentEarning, 0);
  }, [fundList]);

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
    <div className={styles['home-container']}>
      <div className={styles['summary-card']}>
        <div className={styles['summary-row']}>
          <div className={styles['summary-item']}>
            <div className={styles['summary-label']}>
              Total Asset (¥) <EyeOutline fontSize={14} />
            </div>
            <div className={styles['summary-value']}>
              {totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className={styles['summary-item']}>
            <div className={styles['summary-label']}>
              Daily Income
            </div>
            <div className={styles['summary-value']} style={{ color: renderColor(totalDailyIncome) }}>
              {renderSign(totalDailyIncome)}{totalDailyIncome.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles['market-section']}>
        <h2 className={styles['section-title']}>Market Index</h2>
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

      <div className={styles['fund-section']}>
        <div className={styles['sort-bar']}>
          <div className={styles['sort-item']}>
            Common
          </div>
          <div className={styles['sort-item']} onClick={() => handleSort('sector')}>
            Sector {renderSortIcon('sector')}
          </div>
          <div className={styles['sort-item']} onClick={() => handleSort('daily')}>
            Daily {renderSortIcon('daily')}
          </div>
          <div className={styles['sort-item']} onClick={() => handleSort('holding')}>
            Hold {renderSortIcon('holding')}
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
                onClick={() => handleFundClick(fund)}
              >
                <div className={styles['fund-col-main']}>
                  <div className={styles['fund-name']}>{fund.data.name}</div>
                  <div className={styles['fund-tags']}>
                    {fund.isUpdate && <span className={styles['update-tag']}>Updated</span>}
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
    </div>
  );
};

export default Home;
