import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {PieChart} from 'react-native-svg-charts';
import styled from 'styled-components/native';

import {extremeLightGreen, lightGreen, lightYellow} from '../../color';
import {AppContext} from '../../context/Context';

const PieChartComp: React.FC<any> = ({budgetArray}) => {
  const pieData = budgetArray.map((d: any, i: any) => ({
    value: d.amount,
    svg: {
      fill: d.categoryColor,
      onPress: () => console.log('press', i),
    },
    key: `pie-${i}`,
  }));

  return <PieChart style={{height: 130}} data={pieData} />;
};

const Item: React.FC<any> = ({budgetArray, emptyText, color}) => {
  const [categoryList, setCategoryList] = useState<boolean>(false);

  return (
    <>
      <CardMain>
        <CardParent>
          <CardWrapper style={{
            borderColor: color
          }}>
            {budgetArray.length > 0 ? (
              <>
                <CardElem
                  style={{
                    width: '50%',
                  }}>
                  <PieChartComp budgetArray={budgetArray} />
                </CardElem>
                <CardElem
                  style={{
                    width: '50%',
                  }}>
                  <CardTextTotal>
                    $
                    {budgetArray.reduce(
                      (acc: any, curr: any) => acc + curr.amount,
                      0,
                    )}
                  </CardTextTotal>

                  <CardCategoryMain>
                    <TouchableOpacity
                      onPress={() => setCategoryList(cat => !cat)}>
                      <CardCategoryBtn>
                        <CardCategoryBtnText
                          style={{
                            color: color,
                          }}>
                          Categories
                        </CardCategoryBtnText>
                        <AntDesign name="caretdown" size={20} color={color} />
                      </CardCategoryBtn>
                    </TouchableOpacity>
                    <View>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={categoryList}
                        onRequestClose={() => setCategoryList(cat => !cat)}>
                        <CardCategoryParent>
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 20,
                              right: 20,
                            }}
                            activeOpacity={0.8}
                            onPress={() => setCategoryList(false)}>
                            <Entypo name="cross" size={30} />
                          </TouchableOpacity>
                          {budgetArray.map((d: any, i: any) => (
                            <CardCategoryWrapper key={i}>
                              <CardColorCat
                                style={{
                                  backgroundColor: d.categoryColor,
                                }}
                              />
                              <CardTextCat>{d.categories}</CardTextCat>
                            </CardCategoryWrapper>
                          ))}
                        </CardCategoryParent>
                      </Modal>
                    </View>
                  </CardCategoryMain>
                </CardElem>
              </>
            ) : (
                <EmptyChartMain>
                  <EmptyChartText>
                    No {emptyText}
                  </EmptyChartText>
                  <FontAwesome5 name="money-check" color={color} size={40} />
                </EmptyChartMain>
              )}
          </CardWrapper>
        </CardParent>
      </CardMain>
    </>
  );
};

const CardChart: React.FC = () => {
  const {state} = useContext(AppContext);

  const DATA = [
    {
      budgetArray: state.incomeTrackerList,
      emptyText: 'Income',
      color: lightGreen,
      id: `${Math.random()}`,
    },
    {
      budgetArray: state.expenseTrackerList,
      emptyText: 'Expense',
      color: lightYellow,
      id: `${Math.random()}`,
    },
  ];

  const renderItem: React.FC<any> = ({item}) => (
    <Item budgetArray={item.budgetArray} emptyText={item.emptyText} color={item.color} />
  );

  return (
    <>
      <View>
        <FlatList
          data={DATA}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};
// EmptyChart
const EmptyChartMain = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
const EmptyChartText = styled.Text`
  font-size: 25px;
  font-weight: 700;
`;

//Card Element
const CardMain = styled.View``;
const CardParent = styled.View``;
const CardWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom-width: 4px;
  border-radius: 10px;
  background-color: #eff5f3;
  width: ${Dimensions.get('window').width - 60}px;
  height: 200px;
  margin: 0 5px;
`;
const CardElem = styled.View`
  margin: 0 20px;
`;
const CardTextTotal = styled.Text`
  font-size: 30px;
  font-weight: 700;
`;
const CardCategoryMain = styled.View``;
const CardCategoryParent = styled.View`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: ${Dimensions.get('window').width}px;
  background-color: #f0f0f0;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 50px 20px;
  min-height: 150px;
  height: 50%;
`;
const CardCategoryBtn = styled.View`
  width: 130px;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const CardCategoryBtnText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;
const CardCategoryWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-right: 5px;
`;
const CardTextCat = styled.Text`
  font-size: 18px;
  opacity: 0.7;
  margin-left: 10px;
  width: 75%;
`;
const CardColorCat = styled.View`
  width: 20px;
  height: 20px;
`;

export default CardChart;
