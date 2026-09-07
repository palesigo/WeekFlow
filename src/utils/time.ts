export const toMinutes = (time: string) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
export const activityStyle = (start: string, end: string, firstHour = 7, pxPerMinute = 1.2) => ({
  top: (toMinutes(start) - firstHour * 60) * pxPerMinute,
  height: Math.max(28, (toMinutes(end) - toMinutes(start)) * pxPerMinute),
});
