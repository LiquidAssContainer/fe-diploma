import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export const lazy = <T extends Record<string, React.FunctionComponent>>(
  loader: () => Promise<T>,
  name: keyof T,
  //todo?
): FC<any> =>
  React.lazy(async () => {
    const module = await loader();
    return { default: module[name] };
  });
