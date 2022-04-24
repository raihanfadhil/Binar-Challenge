import 'react-native';
import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import { Register } from '../src/pages/Register';

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

  describe('Register test', () => {
    it('should input form Register values', async () => {
      const { getByTestId } = render(<Register navigation={navigation} />);
      const { name, email, password } = {
        name: getByTestId('nameInput'),
        email: getByTestId('emailInput'),
        password: getByTestId('passInput'),
      };
      await act(async () => {
        fireEvent.changeText(name, 'Raihan Fadhil');
        fireEvent.changeText(email, 'raihanfadhil318@gmail.com');
        fireEvent.changeText(password, 'raihan123');
      });
      expect(name.props.value).toEqual('Raihan Fadhil');
      expect(email.props.value).toEqual('raihanfadhil318@gmail.com');
      expect(password.props.value).toEqual('raihan123');
    });

    it('should display all error form validation on Register', async () => {
      const { getByTestId, queryByTestId } = render(<Register navigation={navigation} />);
      await act(async () => {
        fireEvent.press(getByTestId('registerButton'));
      });
      expect(queryByTestId('name_error_validation')).toBeTruthy();
      expect(queryByTestId('email_error_validation')).toBeTruthy();
      expect(queryByTestId('password_error_validation')).toBeTruthy();
    });

    it('should display name error, email and password not error form validation on Register', async () => {
      const { getByTestId, queryByTestId } = render(<Register navigation={navigation} />);
      await act(async () => {
        fireEvent.changeText(getByTestId('emailInput'), 'raihanfadhil318@gmail.com');
        fireEvent.changeText(getByTestId('passInput'), 'raihan123');
        fireEvent.press(getByTestId('registerButton'));
      });
      expect(queryByTestId('name_error_validation')).toBeTruthy();
      expect(queryByTestId('email_error_validation')).not.toBeTruthy();
      expect(queryByTestId('password_error_validation')).not.toBeTruthy();
    });

    it('should display email error, name and password not error form validation on Register', async () => {
      const { getByTestId, queryByTestId } = render(<Register navigation={navigation} />);
      await act(async () => {
        fireEvent.changeText(getByTestId('nameInput'), 'Raihan Fadhil');
        fireEvent.changeText(getByTestId('passInput'), 'raihan123');
        fireEvent.press(getByTestId('registerButton'));
      });
      expect(queryByTestId('email_error_validation')).toBeTruthy();
      expect(queryByTestId('name_error_validation')).not.toBeTruthy();
      expect(queryByTestId('password_error_validation')).not.toBeTruthy();
    });

    it('should display password error, name and email not error and form validation on Register', async () => {
      const { getByTestId, queryByTestId } = render(<Register navigation={navigation} />);
      await act(async () => {
        fireEvent.changeText(getByTestId('name_input'), 'Raihan Fadhil');
        fireEvent.changeText(getByTestId('email_input'), 'raihanfadhil318@gmail.com');
        fireEvent.press(getByTestId('registerButton'));
      });
      expect(queryByTestId('password_error_validation')).toBeTruthy();
      expect(queryByTestId('name_error_validation')).not.toBeTruthy();
      expect(queryByTestId('email_error_validation')).not.toBeTruthy();
    });
  });
