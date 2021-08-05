import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';

//Package Imports
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import moment from 'moment';

//File Imports
import {extremeLightGreen, lightGreen} from '../../color';
import {AppContext} from '../../context/Context';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IProps {
  formOpen: boolean;
  setFormOpen: any;
}

const Item: React.FC<any> = ({name, color, setFormCategoryOpen}) => {
  const {state, selectCategory} = useContext(AppContext);

  return (
    <>
      <FormTypeDropdown>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setFormCategoryOpen((drop: boolean) => !drop);
            selectCategory(name, color);
          }}>
          <FormTypeDropdownText>{name}</FormTypeDropdownText>
        </TouchableOpacity>
      </FormTypeDropdown>
    </>
  );
};

const TrackerForm: React.FC<IProps> = ({formOpen, setFormOpen}) => {
  const {state, selectType, selectAmount, onChangeDate, onAddBudget} = useContext(AppContext);

  const [date, setDate] = useState(new Date(Date.now()));
  const [formDropdown, setFormDropdown] = useState<boolean>(false);
  const [formCategoryOpen, setFormCategoryOpen] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    onChangeDate(currentDate);
  };

  const renderItem: React.FC<any> = ({item}) => (
    <Item name={item.name} color={item.color} setFormCategoryOpen={setFormCategoryOpen} />
  );

  return (
    <>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={formOpen}
          onRequestClose={() => {
            setFormOpen((open: boolean) => !open);
          }}>
          <FormParent>
            <FormWrapper>
              <FormHeader>
                <FormText>Budge Planner</FormText>
                <FormCloseBtn>
                  <TouchableOpacity
                    onPress={() => setFormOpen((open: boolean) => !open)}>
                    <Entypo name="cross" size={40} />
                  </TouchableOpacity>
                </FormCloseBtn>
              </FormHeader>

              <FormElemWrapper>
                {/* Type */}
                <FormElem
                  style={{
                    width: '40%',
                  }}>
                  <FormTypeText>Type</FormTypeText>
                  <FormTypeMenu>
                    <TouchableOpacity
                      onPress={() => setFormDropdown((drop: boolean) => !drop)}>
                      <FormMenuBtnWrapper>
                        <FormMenuBtn>
                          <FormMenuBtnText>{state.type}</FormMenuBtnText>
                          <Entypo name="triangle-down" size={30} />
                        </FormMenuBtn>
                      </FormMenuBtnWrapper>
                    </TouchableOpacity>
                    {formDropdown && (
                      <FormTypeDropdownWrapper
                        style={{
                          left: 40,
                          width: 200,
                        }}>
                        <FormTypeDropdown>
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                              setFormDropdown((drop: boolean) => !drop);
                              selectType('Income');
                            }}>
                            <FormTypeDropdownText>Income</FormTypeDropdownText>
                          </TouchableOpacity>

                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                              setFormDropdown((drop: boolean) => !drop);
                              selectType('Expense');
                            }}>
                            <FormTypeDropdownText>Expense</FormTypeDropdownText>
                          </TouchableOpacity>
                        </FormTypeDropdown>
                      </FormTypeDropdownWrapper>
                    )}
                  </FormTypeMenu>
                </FormElem>

                {/* Category */}
                <FormElem
                  style={{
                    marginLeft: 10,
                    width: '58%',
                  }}>
                  <FormTypeText>Category</FormTypeText>
                  <FormTypeMenu>
                    <TouchableOpacity
                      onPress={() =>
                        setFormCategoryOpen((drop: boolean) => !drop)
                      }>
                      <FormMenuBtnWrapper>
                        <FormMenuBtn>
                          <FormMenuBtnText>{state.categories}</FormMenuBtnText>
                          <Entypo name="triangle-down" size={30} />
                        </FormMenuBtn>
                      </FormMenuBtnWrapper>
                    </TouchableOpacity>
                    {formCategoryOpen && (
                      <FormTypeDropdownWrapper
                        style={{
                          width: 250,
                          height: 400,
                          left: -150,
                          top: 50,
                        }}>
                        <FlatList
                          data={
                            state.type === 'Income'
                              ? state.incomeCategoryList
                              : state.expenseCategoryList
                          }
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                        />
                      </FormTypeDropdownWrapper>
                    )}
                  </FormTypeMenu>
                </FormElem>
              </FormElemWrapper>

              {/* Amount */}
              <FormElemWrapper>
                <FormElem
                  style={{
                    width: '38%',
                  }}>
                  <FormTypeText>Amount</FormTypeText>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="$ $ $"
                    value={state.amount}
                    onChangeText={(e: any) => selectAmount(e)}
                  />
                </FormElem>

                {/* Date */}
                <FormElem
                  style={{
                    width: '60%',
                  }}>
                  <FormTypeText>Date</FormTypeText>
                  <FormDateWrapper>
                    <FormDateElem>
                      <FormDateElemText>{state.dateValue}</FormDateElemText>
                    </FormDateElem>
                    <FormDateElem>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setShowDatePicker(date => !date)}>
                        <FormDateElemPicker>
                          <Fontisto name="date" size={30} />
                        </FormDateElemPicker>
                      </TouchableOpacity>
                    </FormDateElem>
                  </FormDateWrapper>
                </FormElem>
                {showDatePicker && (
                  <>
                    <FormDatePicker>
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                      />
                    </FormDatePicker>
                  </>
                )}
              </FormElemWrapper>

              <FormElemWrapper>
                <FormElem
                  style={{
                    width: 280,
                    marginHorizontal: 30,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      onAddBudget();
                      setFormOpen(false);
                    }}>
                    <FormAddBtn>
                      <FormAddBtnText>Add Budget</FormAddBtnText>
                      <AntDesign name="plus" size={35} color="#fff" />
                    </FormAddBtn>
                  </TouchableOpacity>
                </FormElem>
              </FormElemWrapper>
            </FormWrapper>
          </FormParent>
        </Modal>
      </View>
    </>
  );
};

// Form
const FormParent = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  border-color: ${lightGreen};
  border-top-width: 5px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 75%;
`;
const FormWrapper = styled.View`
  padding: 20px 10px;
`;
const FormHeader = styled.View``;
const FormText = styled.Text`
  font-size: 26px;
  font-weight: 700;
`;
const FormCloseBtn = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;
const FormElemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;
const FormElem = styled.View``;

// Type & Category
const FormTypeText = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
`;
const FormTypeMenu = styled.View``;
const FormMenuBtnWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: rgba(0, 0, 0, 0.4);
  border-width: 1px;
  width: 100%;
  min-height: 60px;
`;
const FormMenuBtn = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
`;
const FormMenuBtnText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;
const FormTypeDropdownWrapper = styled.View`
  position: absolute;
  left: 0px;
  top: 60px;
  background-color: ${extremeLightGreen};
  z-index: 1;
  padding: 30px;
`;
const FormTypeDropdown = styled.View``;
const FormTypeDropdownText = styled.Text`
  font-size: 22px;
  padding: 10px 0;
`;

//Date
const FormDateWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #000;
  padding: 15px 10px;
`;
const FormDateElem = styled.View`
  margin: 0 5px;
`;
const FormDateElemText = styled.Text`
  font-size: 20px;
`;
const FormDatePicker = styled.View``;
const FormDateElemPicker = styled.Text``;

// Add Button
const FormAddBtn = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${lightGreen};
  padding: 15px 30px;
`;
const FormAddBtnText = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #fff;
`;

const styles = StyleSheet.create({
  amountInput: {
    borderWidth: 1,
    borderBottomColor: '#000',
    fontWeight: '700',
    fontSize: 20,
    padding: 18,
  },
});

export default TrackerForm;
