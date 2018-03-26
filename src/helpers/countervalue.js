/**
 * @module helpers/countervalue
 * @flow
 */

import type { GetPairHistory, CalculateCounterValue } from "../types";

/**
 * creates a CalculateCounterValue utility with a GetPairHistory.
 * This can be plugged on a redux store.
 * NB you still have to sync prices yourself. (later we might embrace future React suspense idea in GetPairHistory)
 * @memberof helpers/countervalue
 */
export const makeCalculateCounterValue = (
  getPairHistory: GetPairHistory
): CalculateCounterValue => (currency, fiatUnit) => {
  // FIXME we need to introduce ticker field on currency type
  const getPair = getPairHistory(currency.units[0].code, fiatUnit.code);
  return (value, date) => {
    const countervalue = getPair(date);
    if (!countervalue) return 0;
    return Math.round(value * countervalue);
  };
};

const twoDigits = (n: number) => (n > 9 ? `${n}` : `0${n}`);

/**
 * efficient implementation of YYYY-MM-DD formatter
 * @memberof helpers/countervalue
 */
export const formatCounterValueDay = (d: Date) =>
  `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}-${twoDigits(d.getDate())}`;