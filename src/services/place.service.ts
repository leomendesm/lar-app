import axios from 'axios';
import api from '../../constants/api';
import UserService from "./user.service";

export default class PlaceService {
  static async search(road: string) {
    const token = await UserService.checkUserLocal()
    try {
      return axios.get(`${api}/place/fetch/${road}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      return false;
    }
  }

  static async getPlace(id: string) {
    const token = await UserService.checkUserLocal()
    try {
      return axios.get(`${api}/places/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      return false;
    }
  }

  static async ratePlace(id: string, rating: number) {
    const token = await UserService.checkUserLocal()
    try {
      return axios.post(`${api}/ratings/`, {
        placeId: id,
        rating
      },{
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (e) {
      return false;
    }
  }
}
