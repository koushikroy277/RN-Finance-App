import React, {useState, useReducer, createContext} from 'react';
import {conReduce} from './conReduce';
import moment from 'moment';

const initialContext: any = {};
export const AppContext = createContext(initialContext);

interface conInter {
  amount: any;
  type: string;
  categoryColor: string;
  categories: string;
  dateValue: string;
  incomeCategoryList: any[];
  expenseCategoryList: any[];
  incomeTrackerList: any[];
  expenseTrackerList: any[];
}

const initialState: conInter = {
  amount: '',
  type: 'Choose',
  categoryColor: '',
  categories: 'Choose',
  dateValue: `${moment().format('MMMM Do YYYY')}`,
  incomeTrackerList: [],
  expenseTrackerList: [],
  incomeCategoryList: [
    {color: '#8ded07', name: 'Freelancing', id: `${Math.random()}`},
    {color: '#00fa00', name: 'Stocks Exchange', id: `${Math.random()}`},
    {color: '#28d065', name: 'Digital Marketing', id: `${Math.random()}`},
    {color: '#14d5ab', name: 'Blogging/Portfolio', id: `${Math.random()}`},
    {color: '#0da383', name: 'Online Selling', id: `${Math.random()}`},
    {color: '#059e05', name: 'Salary', id: `${Math.random()}`},
    {color: '#608517', name: 'Dividend Stocks', id: `${Math.random()}`},
    {color: '#568f06', name: 'Retail Products', id: `${Math.random()}`},
    {color: '#3f7b2c', name: 'Real Estate', id: `${Math.random()}`},
    {color: '#014d01', name: 'Rental Income', id: `${Math.random()}`},
    {color: '#014d01', name: 'Advertisement', id: `${Math.random()}`},
  ],
  expenseCategoryList: [
    {color: '#f0e50b', name: 'Clothes', id: `${Math.random()}`},
    {color: '#bdc520', name: 'Entertainment', id: `${Math.random()}`},
    {color: '#dfb81f', name: 'Gym & Sports', id: `${Math.random()}`},
    {color: '#f5af0a', name: 'Accesories', id: `${Math.random()}`},
    {color: '#7b7306', name: 'Food', id: `${Math.random()}`},
    {color: '#8a6f03', name: 'Groceries', id: `${Math.random()}`},
    {color: '#e98f2f', name: 'House Rent', id: `${Math.random()}`},
    {color: '#da7e38', name: 'Trips & Tours', id: `${Math.random()}`},
    {color: '#ed6b07', name: 'Shopping', id: `${Math.random()}`},
    {color: '#9c4d04', name: 'Home Appliances', id: `${Math.random()}`},
    {color: '#5c2406', name: 'Hangout', id: `${Math.random()}`},
  ],
};

const Context: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(conReduce, initialState)
  const [arrayFind, setArrayFind] = useState<string>('');

  const onFormOpen = () =>
    dispatch({
      type: 'onFormOpen',
    });
  
  const selectType = (type: string) => dispatch({
    type: 'selectType',
    payload: type
  })

  const selectCategory = (name: string, color: string) =>
    dispatch({
      type: 'selectCategory',
      payload: {
        name,
        color
      },
    });
  
  const selectAmount = (event: any) => dispatch({
    type: 'selectAmount',
    payload: event
  })

  const onChangeDate = (date: any) =>
    dispatch({
      type: 'onChangeDate',
      payload: date,
    });

  const onAddBudget = () =>
    dispatch({
      type: 'onAddBudget',
    });
  
  const onDeleteList = (id: any, type: any) => dispatch({
    type: 'onDeleteList',
    payload: {
      id,
      type
    }
  });

  const clearAllIncome = () => dispatch({
    type: 'clearAllIncome'
  });

  const clearAllExpense = () => dispatch({
    type: 'clearAllExpense'
  })

  return (
    <AppContext.Provider
      value={{
        state,
        onFormOpen,
        selectType,
        selectAmount,
        selectCategory,
        clearAllExpense,
        clearAllIncome,
        onDeleteList,
        onChangeDate,
        onAddBudget,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
