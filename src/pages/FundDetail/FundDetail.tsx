import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NavBar, Toast, PullToRefresh } from 'antd-mobile';
import type { FundItem } from '../../types';
import { fetchFundList } from '../../services/api';
import { TEXTS } from '../../common/texts';
import styles from './FundDetail.module.less';
import {
  SkeletonLoader,
  SummaryCard,
  FundHeader,
  HoldingsCard,
  BasicInfoCard,
  IndustryCard
} from './components';

const FundDetail: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const location = useLocation();
  const [fund, setFund] = useState<FundItem | null>(location.state?.fund || null);
  const [loading, setLoading] = useState(false);

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
            content: TEXTS.FUND_DETAIL.NOT_FOUND,
            icon: 'fail'
          });
        }
      }
    } catch {
      Toast.show({
        content: TEXTS.FUND_DETAIL.FAILED_LOAD_DETAIL,
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

  if (!fund && loading) {
    return (
      <div className={styles['detail-container']}>
        <NavBar onBack={() => navigate(-1)}>{TEXTS.FUND_DETAIL.TITLE}</NavBar>
        <div className={styles['detail-content']}>
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (!fund) {
    return (
      <div className={styles['detail-container']}>
        <NavBar onBack={() => navigate(-1)}>{TEXTS.FUND_DETAIL.TITLE}</NavBar>
        <div className={styles['loading-container']}>
          {TEXTS.FUND_DETAIL.NOT_FOUND}
        </div>
      </div>
    )
  }

  return (
    <div className={styles['detail-container']}>
      <NavBar onBack={() => navigate(-1)}>{fund.data.name}</NavBar>
      <div className={styles['detail-content']}>
        <PullToRefresh onRefresh={loadFundDetail}>
          <SummaryCard fund={fund} />
          <FundHeader fund={fund} />
          <HoldingsCard fund={fund} />
          <BasicInfoCard fund={fund} />
          <IndustryCard fund={fund} />
        </PullToRefresh>
      </div>
    </div>
  );
};

export default FundDetail;
