import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  appBackground: '#FFF',
  appColor: '#000',
  appDefaultStroke: '#E0E0E0',
  appLogo: 'dnc-logo-black.svg',
  appSkeletonFrom: '#eee',
  appSkeletonTo: '#ccc',
  buttons: {
    alert: '#E00',
    alertColor: '#FFF',
    alertHover: '#C00',
    disabled: '#CCC',
    disabledColor: '#666',
    primary: '#0070f3',
    primaryColor: '#FFF',
    primaryHover: '#0059c1'
  },
  card: {
    alert: '#fdecea',
    background: '#fff',
    border: '#e0e0e0',
    success: '#e6ffed',
    warning: '#fff4e5'
  },
  textInput: {
    active: '#0070f3',
    activeColor: '#000',
    borderColor: '#ccc',
    disabled: '#f5f5f5',
    disabledBorderColor: '#e0e0e0',
    disabledColor: '#999',
    placeholderColor: '#aaa'
  },
  typographies: {
    error: '#E00',
    subtitle: '#666',
    success: '#080'
  }
};

export const darkTheme: DefaultTheme = {
  appBackground: '#222',
  appColor: '#fff',
  appDefaultStroke: '#E0E0E0',
  appLogo: 'dnc-logo-black.svg',
  appSkeletonFrom: '#444',
  appSkeletonTo: '#333',
  buttons: {
    alert: '#E00',
    alertColor: '#FFF',
    alertHover: '#C00',
    disabled: '#CCC',
    disabledColor: '#666',
    primary: '#0070f3',
    primaryColor: '#FFF',
    primaryHover: '#0059c1'
  },
  card: {
    alert: '#fdecea',
    background: '#222',
    border: '#e0e0e0',
    success: '#e6ffed',
    warning: '#fff4e5'
  },
  textInput: {
    active: '#0070f3',
    activeColor: '#fff',
    borderColor: '#ccc',
    disabled: '#444',
    disabledBorderColor: '#e0e0e0',
    disabledColor: '#999',
    placeholderColor: '#aaa'
  },
  typographies: {
    error: '#E00',
    subtitle: '#ccc',
    success: '#080'
  }
};
