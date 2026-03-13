import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, PullToRefresh } from 'antd-mobile';
import { fetchMarketIndex, fetchFundList, fetchFundEstimates } from '../../services/api';
import type { MarketIndex, FundItem } from '../../types';
import { TEXTS } from '../../common/texts';
import styles from './Home.module.less';
import {
  SkeletonLoader,
  SummaryCard,
  MarketSection,
  FundListSection
} from './components';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [marketIndexes, setMarketIndexes] = useState<MarketIndex[]>([]);
  const [fundList, setFundList] = useState<FundItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const [indexData, fundData] = await Promise.all([
        fetchMarketIndex(),
        fetchFundList()
      ]);

      if (indexData.code === 200) {
        setMarketIndexes(indexData.data.slice(0, 6)); // Display top 6 indexes
      }

      if (fundData.code === 200) {
        const list = fundData.data.list;
        setFundList(list);
        fetchEstimates(list);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Toast.show({
        icon: 'fail',
        content: TEXTS.COMMON.FAILED_LOAD_DATA,
      });
    } finally {
      if (!isRefresh) setLoading(false);
    }
  };

  // 获取实时净值
  const fetchEstimates = async (fundList: FundItem[]) => {
    if (!fundList.length) return;

    try {
      const res = await fetchFundEstimates(fundList.map(f => f.code));
      console.log('res', res);
      if (res.code === 200) {
        console.log('res', res);
      }
    } catch (error) {
      console.error('Error loading fund estimates:', error);
      Toast.show({
        icon: 'fail',
        content: TEXTS.COMMON.FAILED_LOAD_DATA,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFundClick = (fund: FundItem) => {
    navigate(`/fund/${fund.code}`, { state: { fund } });
  };

  const totalAssets = useMemo(() => {
    return fundList.reduce((acc, curr) => acc + curr.money, 0);
  }, [fundList]);

  const totalDailyIncome = useMemo(() => {
    return fundList.reduce((acc, curr) => acc + curr.currentEarning, 0);
  }, [fundList]);

  return (
    <div className={styles['home-container']}>
      <PullToRefresh onRefresh={() => loadData(true)}>
        {loading ? <SkeletonLoader /> : (
          <>
            <SummaryCard totalAssets={totalAssets} totalDailyIncome={totalDailyIncome} />
            <MarketSection marketIndexes={marketIndexes} />
            <FundListSection fundList={fundList} onFundClick={handleFundClick} />
          </>
        )}
      </PullToRefresh>
    </div>
  );
};

export default Home;
