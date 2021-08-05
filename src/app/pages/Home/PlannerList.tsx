import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';

import { extremeLightGreen, lightGray, mediumGray, lightGreen, lightYellow } from '../../color';
import {AppContext} from '../../context/Context';

const PlannerList: React.FC<any> = ({headlineTab}) => {
  const {state, onDeleteList, clearAllIncome, clearAllExpense} =
    useContext(AppContext);
  const [listMenu, setListMenu] = useState<boolean>(false);
  const [listId, setListId] = useState<any>(null);

  const budgetArray = headlineTab.incomeTabOpen
    ? state.incomeTrackerList
    : state.expenseTrackerList;

  return (
    <>
      {budgetArray.length > 0 ? (
        <ScrollView>
          <PlannerListMain>
            {/* Budget List */}
            <PlannerListParent>
              <TouchableOpacity
                style={{marginBottom: 10}}
                activeOpacity={0.7}
                onPress={
                  headlineTab.incomeTabOpen ? clearAllIncome : clearAllExpense
                }>
                <ClearAll>
                  <ClearAllText>Clear All</ClearAllText>
                </ClearAll>
              </TouchableOpacity>
              {budgetArray
                .slice(0)
                .reverse()
                .map((d: any, i: any) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                    }}>
                    {listMenu && listId === d.id && (
                      <ListMenuMain>
                        <ListMenuWrapper>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              setListMenu(false);
                            }}>
                            <ListMenuWrapperList>
                              <Entypo name="cross" size={30} />
                            </ListMenuWrapperList>
                          </TouchableOpacity>
                        </ListMenuWrapper>

                        <ListMenuWrapper
                          style={{
                            marginLeft: 5,
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              onDeleteList(d.id, d.type);
                              setListMenu(false);
                            }}>
                            <ListMenuWrapperList>
                              <MaterialCommunityIcons
                                name="delete-outline"
                                size={30}
                              />
                            </ListMenuWrapperList>
                          </TouchableOpacity>
                        </ListMenuWrapper>
                      </ListMenuMain>
                    )}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onLongPress={() => {
                        setListMenu(true);
                        setListId(d.id);
                      }}>
                      <PlannerListWrapper
                        style={{
                          backgroundColor: d.color,
                        }}>
                        <PlannerListElem
                          style={{
                            flexDirection: 'row',
                          }}>
                          {d.icon}
                          <Ionicons name="bar-chart-outline" size={30} />
                        </PlannerListElem>
                        <PlannerListElem>
                          <PlannerListType>{d.type}</PlannerListType>
                        </PlannerListElem>
                        <PlannerListElem>
                          <PlannerListCategory>
                            {d.categories}
                          </PlannerListCategory>
                          <PlannerListDate>{d.date}</PlannerListDate>
                        </PlannerListElem>
                        <PlannerListElem>
                          <PlannerListAmount>{d.amount}</PlannerListAmount>
                        </PlannerListElem>
                      </PlannerListWrapper>
                    </TouchableOpacity>
                  </View>
                ))}
            </PlannerListParent>
          </PlannerListMain>
        </ScrollView>
      ) : (
        <EmptyListMain>
            <EmptyListText>No {headlineTab.incomeTabOpen ? 'Income' : 'Expense'} has been set</EmptyListText>
            <AntDesign name="areachart" color='#c9c9c9' size={60} />
        </EmptyListMain>
      )}
    </>
  );
};
const EmptyListMain = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  `;
const EmptyListText = styled.Text`
  font-size: 27px;
  margin-bottom: 20px;
`;

const PlannerListMain = styled.View``;
const ClearAll = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
`;
const ClearAllText = styled.Text`
  font-size: 18px;
`;

// Budget List
const PlannerListParent = styled.View`
  margin: 30px 5px;
`;
const PlannerListWrapper = styled.View<any>`
  width: ${Dimensions.get('window').width - 10}px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  padding: 20px 0;
  margin: 10px 0;
`;
const PlannerListElem = styled.View``;
const PlannerListType = styled.Text`
  font-size: 22px;
`;
const PlannerListCategory = styled.Text`
  font-size: 18px;
  opacity: 0.7;
`;
const PlannerListAmount = styled.Text`
  font-size: 22px;
`;
const PlannerListDate = styled.Text`
  font-size: 18px;
  opacity: 0.5;
`;

// List Menu
const ListMenuMain = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;
const ListMenuWrapper = styled.View`
  width: 70px;
  height: 80%;
  border-radius: 10px;
`;
const ListMenuWrapperList = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
`;

export default PlannerList;
