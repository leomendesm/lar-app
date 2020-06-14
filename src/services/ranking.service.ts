import axios from 'axios';
import api from '../../constants/api';
import UserService from "./user.service";

export default class RankingService {
  static async ranking() {
    const token = await UserService.checkUserLocal()
    try {
      return axios.get(`${api}/ranking/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      return false;
    }
  }
}
