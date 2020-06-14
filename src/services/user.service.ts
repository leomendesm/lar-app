import axios from 'axios';
import api from '../../constants/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateType from "../types/DateType";

export default class UserService {
  static async login(username: string, password: string) {
    try {
      const response = await axios.post(`${api}/login`, {username, password});
      await this.saveLocalUser(response.data.token);
      return true;
    } catch (e) {
      return false;
    }
  }
  static async getUser(id: string) {
    try {
      const token = await this.checkUserLocal()
      return axios.get(`${api}/users/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      return false;
    }
  }
  static async register(
    username: string,
    password: string,
    cpf: string,
    cellphone: string,
  ) {
    try {
      await axios.post(`${api}/users`, {
        username,
        password,
        cpf,
        cellphone,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async saveDates(
    dates: DateType[],
  ) {
    try {
      const token = await this.checkUserLocal()
      await axios.post(`${api}/dates`, {
        data: dates
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async checkUserLocal() {
    return AsyncStorage.getItem('user');
  }

  private static async saveLocalUser(jwt: string) {
    await AsyncStorage.setItem('user', jwt);
  }
}
