import 'react-native';
import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import { Login } from '../src/pages/Login';

jest.mock('react-native-gesture-handler', () => {});
jest.mock("@react-native-community/netinfo", () => ({
  fetch: () => Promise.resolve(jest.fn()),
}));
jest.mock('react-native-push-notification', () => ({
    configure: jest.fn(),
    onRegister: jest.fn(),
    onNotification: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
}));

const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };

describe('Login test', () => {
    it('should input form Login', async () => {
      const { getByTestId } = render(<Login navigation={navigation} />);

      const { email, password } = {
        email: getByTestId('emailInput'),
        password: getByTestId('passInput'),
      };

      await act(async () => {
        fireEvent.changeText(email, 'reybin@gmail.com');
        fireEvent.changeText(password, 'reyh2022');
      });

      expect(email.props.value).toEqual('reybin@gmail.com');
      expect(password.props.value).toEqual('reyh2022');
    });

    it('should display error form validation on Login', async () => {
      const { getByTestId, queryByTestId } = render(<Login navigation={navigation} />);

      await act(async () => {
        fireEvent.press(getByTestId('loginButton'));
      });

      expect(queryByTestId('email_error_validation')).toBeTruthy();
      expect(queryByTestId('password_error_validation')).toBeTruthy();
    });

    it('should display email error and password not error form validation on Login', async () => {
      const { getByTestId, queryByTestId } = render(<Login navigation={navigation} />);

      await act(async () => {
        fireEvent.changeText(getByTestId('passInput'), 'reyh2022');
        fireEvent.press(getByTestId('loginButton'));
      });

      expect(queryByTestId('email_error_validation')).toBeTruthy();
      expect(queryByTestId('password_error_validation')).not.toBeTruthy();
    });

    it('should display email not error and password error form validation on Login', async () => {
      const { getByTestId, queryByTestId } = render(<Login navigation={navigation} />);

      await act(async () => {
        fireEvent.changeText(getByTestId('emailInput'), 'reybin@gmail.com');
        fireEvent.press(getByTestId('loginButton'));
      });

      expect(queryByTestId('email_error_validation')).not.toBeTruthy();
      expect(queryByTestId('password_error_validation')).toBeTruthy();
    });
  });
