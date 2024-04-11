import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { rootActions } from '../store/reducers';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(rootActions, dispatch),
    [dispatch],
  )
};
