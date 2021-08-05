import React from 'react';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  extremeLightGreen,
  extremeLightYellow,
  iconGreen,
  iconYellow,
} from '../color';

export const conReduce = (state: any, action: any) => {
  switch (action.type) {
    case 'onFormOpen':
      return {
        ...state,
        dateValue: `${moment().format('MMMM Do YYYY')}`,
        categories: 'Select',
        type: 'Income',
        amount: '',
      };

    case 'selectType':
      return {...state, type: action.payload};

    case 'selectAmount':
      return {...state, amount: action.payload};

    case 'selectCategory':
      return {
        ...state,
        categories: action.payload.name,
        categoryColor: action.payload.color,
      };

    case 'onDeleteList':
      if (action.payload.type === 'Income') {
        const newList = state.incomeTrackerList.filter(
          (arr: any) => arr.id !== action.payload.id,
        );

        return {...state, incomeTrackerList: newList};
      } else if (action.payload.type === 'Expense') {
        const newList = state.expenseTrackerList.filter(
          (arr: any) => arr.id !== action.payload.id,
        );

        return {...state, expenseTrackerList: newList};
      }

    case 'clearAllIncome':
      return {
        ...state,
        incomeTrackerList: [],
      };

    case 'clearAllExpense':
      return {
        ...state,
        expenseTrackerList: [],
      };

    case 'onChangeDate':
      const formatedDate = moment(action.payload).format('DD MMMM YYYY');
      return {...state, dateValue: formatedDate};

    case 'onAddBudget':
      if (state.type === 'Income') {
        return {
          ...state,
          incomeTrackerList: [
            ...state.incomeTrackerList,
            {
              type: state.type,
              amount: parseInt(state.amount),
              categories: state.categories,
              categoryColor: state.categoryColor,
              date: state.dateValue,
              icon: <Ionicons name="arrow-up-outline" size={30} />,
              id: `${Math.random()}`,
              color: iconGreen,
              lightColor: extremeLightGreen,
            },
          ],
        };
      }
      if (state.type === 'Expense') {
        return {
          ...state,
          expenseTrackerList: [
            ...state.expenseTrackerList,
            {
              type: state.type,
              amount: parseInt(state.amount),
              categories: state.categories,
              categoryColor: state.categoryColor,
              date: state.dateValue,
              icon: <Ionicons name="arrow-down-outline" size={30} />,
              id: `${Math.random()}`,
              color: iconYellow,
              lightColor: extremeLightYellow,
            },
          ],
        };
      }

    default:
      throw new Error();
  }
};
