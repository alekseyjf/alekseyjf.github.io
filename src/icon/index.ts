import { ElementType } from 'react';
import { ReactComponent as Europe } from './europe.svg';

export enum Icons {
  EuropeIcon = 'europe',
  UnitedIcon = 'united',
}

export const IconsSVG: Record<string, ElementType> = {
  [Icons.EuropeIcon]: Europe,
  [Icons.UnitedIcon]: Europe,
};
