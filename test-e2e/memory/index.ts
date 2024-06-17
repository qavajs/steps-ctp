import { resolve } from 'node:path';

const file = (path: string) => `file://${path}`;
export default class Memory {
  array = (...args: Array<any>) => args;

  users = JSON.stringify([{ name: 'Memory Mock 1' }, { name: 'Memory Mock 2' }, { name: 'Memory Mock 3' }]);

  dataFile = async (path: string): Promise<any> => {
    const data = await import(path);
    return data.default.getData();
  };

}
