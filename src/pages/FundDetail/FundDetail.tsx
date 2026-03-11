import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NavBar, Card, List, Grid, Toast } from 'antd-mobile';
import { UpOutline, DownOutline, EyeOutline } from 'antd-mobile-icons';
import type { FundItem } from '../../types';
import { fetchFundList } from '../../services/api';
import styles from './FundDetail.module.less';

const FundDetail: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const [fund, setFund] = useState<FundItem | null>(location.state?.fund || null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');

  const loadFundDetail = async () => {
    if (!code) return;
    
    setLoading(true);
    try {
      const res = await fetchFundList();
      if (res.code === 200) {
        const found = res.data.list.find(f => f.code === code);
        if (found) {
          setFund(found);
        } else {
          Toast.show({
            content: 'Fund not found',
            icon: 'fail'
          });
        }
      }
    } catch {
      Toast.show({
        content: 'Failed to load fund details',
        icon: 'fail'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fund && code) {
      loadFundDetail();
    }
  }, [code, fund]);

  const renderColor = (value: number) => value >= 0 ? '#e15241' : '#33b066';
  const renderSign = (value: number) => value > 0 ? '+' : '';

  const sortedIndustries = useMemo(() => {
    if (!fund?.data.relatedIndustryV2) return [];
    const list = [...fund.data.relatedIndustryV2];
    if (sortOrder === 'default') return list;
    
    return list.sort((a, b) => {
      return sortOrder === 'asc' ? a.change - b.change : b.change - a.change;
    });
  }, [fund?.data.relatedIndustryV2, sortOrder]);

  const toggleSort = () => {
    setSortOrder(current => {
      if (current === 'default') return 'desc';
      if (current === 'desc') return 'asc';
      return 'default';
    });
  };

  if (!fund) {
    return (
      <div className={styles['detail-container']}>
        <NavBar onBack={() => navigate(-1)}>Fund Detail</NavBar>
        <div className={styles['loading-container']}>
          {loading ? 'Loading...' : 'Fund not found'}
        </div>
      </div>
    )
  }

  return (
    <div className={styles['detail-container']}>
      <NavBar onBack={() => navigate(-1)}>{fund.data.name}</NavBar>
      <div className={styles['detail-content']}>
        <div className={styles['summary-card']}>
          <div className={styles['summary-row']}>
            <div className={styles['summary-item']}>
              <div className={styles['summary-label']}>
                Total Asset (¥) <EyeOutline fontSize={14} />
              </div>
              <div className={styles['summary-value']}>
                {fund.money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className={styles['summary-item']} onClick={() => {}}>
              <div className={styles['summary-label']}>
                Daily Income
              </div>
              <div className={styles['summary-value']} style={{ color: renderColor(fund.currentEarning) }}>
                {renderSign(fund.currentEarning)}{fund.currentEarning.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className={styles['header-card']}>
          <div className={styles['fund-code-tag']}>{fund.code}</div>
          <div className={styles['earning-display']} style={{ color: renderColor(fund.dailyYield) }}>
            <div className={styles['earning-value']}>{renderSign(fund.dailyYield)}{(fund.dailyYield * 100).toFixed(2)}%</div>
            <div className={styles['earning-label']}>Daily Yield</div>
          </div>
          <Grid columns={3} gap={8}>
            <Grid.Item>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']}>{fund.nav}</div>
                <div className={styles['stat-label']}>NAV ({fund.updateNavTime.split('-').slice(1).join('-')})</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']} style={{ color: renderColor(fund.currentEarning) }}>{renderSign(fund.currentEarning)}{fund.currentEarning.toFixed(2)}</div>
                <div className={styles['stat-label']}>Daily Earn</div>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className={styles['stat-item']}>
                <div className={styles['stat-value']} style={{ color: renderColor(fund.sumEarning) }}>{renderSign(fund.sumEarning)}{fund.sumEarning.toFixed(2)}</div>
                <div className={styles['stat-label']}>Total Earn</div>
              </div>
            </Grid.Item>
          </Grid>
        </div>

        <Card title="Holdings" className={styles['section-card']}>
          <List>
            <List.Item extra={fund.money.toFixed(2)}>Total Asset</List.Item>
            <List.Item extra={fund.headMoney.toFixed(2)}>Principal</List.Item>
            <List.Item extra={<span style={{ color: renderColor(fund.earnings) }}>{renderSign(fund.earnings)}{fund.earnings.toFixed(2)}</span>}>
              Hold Earning
            </List.Item>
          </List>
        </Card>

        <Card title="Basic Info" className={styles['section-card']}>
          <List>
            <List.Item extra={fund.data.investType}>Type</List.Item>
            <List.Item extra={fund.data.investStyle}>Style</List.Item>
            {fund.data.investWorth && <List.Item extra={fund.data.investWorth}>Worth</List.Item>}
            {fund.data.risk && <List.Item extra={fund.data.risk}>Risk</List.Item>}
          </List>
        </Card>

        {fund.data.relatedIndustryV2 && fund.data.relatedIndustryV2.length > 0 && (
          <Card 
            title={
              <div className={styles['card-header-with-sort']} onClick={toggleSort}>
                <span>Related Industry</span>
                <span className={styles['sort-icon']}>
                  {sortOrder === 'default' && <span style={{ fontSize: 12, color: '#999' }}>Sort</span>}
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
        )}
      </div>
    </div>
  );
};

export default FundDetail;
