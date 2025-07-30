// 此文件用于存放通用的工具函数。

export function formatDeadline(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // 获取时区偏移量（以分钟为单位），并转换为小时
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetSign = timezoneOffset >= 0 ? '+' : '-';
  const timezoneString = `UTC${offsetSign}${offsetHours}`;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (${timezoneString})`;
}

export function formatTimelineDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
}

