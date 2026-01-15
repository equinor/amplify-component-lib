import { SeasonalEvent } from './seasonalColors';

/**
 * Computes Easter Sunday for a given year using the
 * Anonymous Gregorian algorithm (Meeus/Jones/Butcher).
 */
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

/**
 * Returns a seasonal event for a given date.
 * Defaults to today.
 */
export function getSeasonalEvent(date = new Date()): SeasonalEvent | null {
  const month = date.getMonth(); // 0-based
  const day = date.getDate();
  const year = date.getFullYear();

  // 🎄 Christmas: Dec 20–26
  if (month === 11 && day >= 20 && day <= 26) {
    return 'christmas';
  }

  // 🎆 New Year: Dec 31 – Jan 2
  if ((month === 11 && day === 31) || (month === 0 && day <= 2)) {
    return 'newYears';
  }

  // ❤️ Valentine's Day: Feb 14
  if (month === 1 && day === 14) {
    return 'valentinesDay';
  }

  // 🌸 International Women’s Day: Mar 8
  if (month === 2 && day === 8) {
    return 'womensDay';
  }

  // 🐣 Easter: ±4 days around Easter Sunday
  const easter = getEasterSunday(year);
  const diffFromEaster =
    (date.getTime() - easter.getTime()) / (1000 * 60 * 60 * 24);

  if (diffFromEaster >= -4 && diffFromEaster <= 4) {
    return 'easter';
  }

  // 🇳🇴 Norwegian Constitution Day: May 17 ±2 days
  if (month === 4 && day >= 15 && day <= 19) {
    return 'norwegianConstitutionDay';
  }

  // 🎃 Halloween: Oct 28–31
  if (month === 9 && day >= 28 && day <= 31) {
    return 'halloween';
  }

  // 🌈 Pride Month: June (entire month)
  if (month === 5) {
    return 'pride';
  }

  return null;
}
