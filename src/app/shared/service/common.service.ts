import { Injectable } from '@angular/core';
import {StorageType} from "../../models/storage.type";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  setStorage(st: StorageType, value) {
    localStorage.setItem(st, JSON.stringify(value));
  }

  getStorage(st: StorageType) {
    return JSON.parse(localStorage.getItem(st));
  }

  deleteStorage(st: StorageType) {
    localStorage.removeItem(st);
  }

  clearStorage() {
    localStorage.clear();
  }
}
