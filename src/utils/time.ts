export function toMinutes(value:string){const [h,m]=value.split(':').map(Number);return h*60+m}
export function activityStyle(start:string,end:string,firstHour=7,pxPerHour=72){const top=Math.max(0,(toMinutes(start)-firstHour*60)*(pxPerHour/60));const height=Math.max(28,(toMinutes(end)-toMinutes(start))*(pxPerHour/60));return {top,left:4,right:4,height}}
