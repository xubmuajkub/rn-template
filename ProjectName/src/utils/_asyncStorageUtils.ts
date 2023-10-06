import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageUtils = {
  async storeData(key: string, data: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, data);
      return true;
    } catch (e) {
      return false;
    }
  },
  async getData(key: string): Promise<any> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  async storeObject(key: string, value: any): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  },
  async getObject(key: string): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  },
  async removeData(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  async clearStorage(exceptions?: Array<string>): Promise<boolean> {
    try {
      const preserveKeys = [];
      if (exceptions && Array.isArray(exceptions)) {
        for (let i = 0; i < exceptions.length; i++) {
          const key = exceptions[i];
          const value = await AsyncStorage.getItem(key);
          if (value) {
            preserveKeys.push({key, value});
          }
        }
      }
      await AsyncStorage.clear();
      if (preserveKeys.length > 0) {
        for (let i = 0; i < preserveKeys.length; i++) {
          const {key, value} = preserveKeys[i];
          await AsyncStorage.setItem(key, value);
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  },
};
