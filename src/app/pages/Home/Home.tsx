import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {extremeLightGreen, lightGreen, mediumGray} from '../../color';
import TrackerForm from './TrackerForm';
import {AppContext} from '../../context/Context';
import PlannerList from './PlannerList';
import CardChart from './CardChart';

const Home: React.FC = () => {
  const {state, onFormOpen} = useContext(AppContext);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [headlineTab, setHeadlineTab] = useState({
    incomeTabOpen: true,
    expenseTabOpen: false,
  });

  return (
    <>
      <HomeParent>
        {/* Header Part */}
        <HomeHeader>
          <HomeHeaderTextWrapper>
            <HomeHeaderText>Welcome</HomeHeaderText>
            <HomeHeaderSubText>Your personal expense tracker</HomeHeaderSubText>
          </HomeHeaderTextWrapper>
        </HomeHeader>
        <HomeHeaderList>
          <CardChart />
        </HomeHeaderList>

        {/* Tracker Form */}
        <TrackerForm formOpen={formOpen} setFormOpen={setFormOpen} />

        <PlannerHeadlineMain>
          <PlannerHeadlineWrapper>
            {/* Recent */}
            <RecentTextWrapper>
              <RecentText>Recent</RecentText>
            </RecentTextWrapper>

            {/* Budget Tab */}
            <BudgetPlanWrapper>
              <TouchableOpacity
                onPress={() =>
                  setHeadlineTab((tab: any) => {
                    return {
                      ...tab,
                      incomeTabOpen: true,
                      expenseTabOpen: false,
                    };
                  })
                }>
                <BudgetHeadline
                  style={{
                    backgroundColor: headlineTab.incomeTabOpen
                      ? mediumGray
                      : 'transparent',
                    opacity: headlineTab.incomeTabOpen ? 1 : 0.5,
                  }}>
                  <BudgetText>Income</BudgetText>
                  {state.incomeTrackerList.length === 0 ? null : (
                    <BudgetBadge>{state.incomeTrackerList.length}</BudgetBadge>
                  )}
                </BudgetHeadline>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setHeadlineTab((tab: any) => {
                    return {
                      ...tab,
                      expenseTabOpen: true,
                      incomeTabOpen: false,
                    };
                  })
                }>
                <BudgetHeadline
                  style={{
                    backgroundColor: headlineTab.expenseTabOpen
                      ? mediumGray
                      : 'transparent',
                    opacity: headlineTab.expenseTabOpen ? 1 : 0.5,
                  }}>
                  <BudgetText>Expense</BudgetText>
                  {state.expenseTrackerList.length === 0 ? null : (
                    <BudgetBadge>{state.expenseTrackerList.length}</BudgetBadge>
                  )}
                </BudgetHeadline>
              </TouchableOpacity>
            </BudgetPlanWrapper>
          </PlannerHeadlineWrapper>
        </PlannerHeadlineMain>

        {/* Budget List */}
        <PlannerList headlineTab={headlineTab} />

        {/* Add Budget Button */}
        <TrackerBtnWrapper>
          <TrackerBtn>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setFormOpen(true);
                onFormOpen();
              }}>
              <AntDesign name="plus" size={40} color="#fff" />
            </TouchableOpacity>
          </TrackerBtn>
        </TrackerBtnWrapper>
      </HomeParent>
    </>
  );
};

const HomeParent = styled.View`
  height: 100%;
  background-color: #fff;
`;

// Header
const HomeHeader = styled.View`
  background-color: ${lightGreen};
  height: 250px;
`;
const HomeHeaderTextWrapper = styled.View`
  padding: 40px 20px;
`;
const HomeHeaderText = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
`;
const HomeHeaderSubText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  opacity: 0.7;
  color: #fff;
`;

const HomeHeaderList = styled.View`
  position: relative;
  top: -100px;
`;

// Headlines
const PlannerHeadlineMain = styled.View`
  margin-top: -60px;
`;
const PlannerHeadlineWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RecentTextWrapper = styled.View`
  background-color: ${extremeLightGreen};
  border-radius: 30px;
  margin-left: 15px;
  width: 130px;
`;
const RecentText = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  padding: 10px;
`;

// Budget Tabs
const BudgetPlanWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const BudgetHeadline = styled.View`
  position: relative;
  margin: 0 5px;
  border-radius: 30px;
  padding: 10px;
`;
const BudgetText = styled.Text`
  font-size: 20px;
`;
const BudgetBadge = styled.Text`
  position: absolute;
  right: -5px;
  top: -15px;
  padding: 3px 11px;
  background-color: red;
  border-radius: 50px;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
`;

//Button
const TrackerBtnWrapper = styled.View`
  position: absolute;
  bottom: 40px;
  right: 30px;
`;
const TrackerBtn = styled.View`
  display: flex;
  align-items: center;
  background-color: ${lightGreen};
  border-radius: 50px;
  padding: 20px 0;
  elevation: 10;
  width: 80px;
`;

export default Home;
