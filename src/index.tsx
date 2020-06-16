import { NativeModules } from 'react-native';

type UniType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Uni } = NativeModules;

export default Uni as UniType;
