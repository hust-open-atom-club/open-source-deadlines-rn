export interface TimelineEvent {
  deadline: string;
  comment: string;
}

export interface EventData {
  year: number;
  id: string;
  link: string;
  timeline: TimelineEvent[];
  timezone: string;
  date: string;
  place: string;
}

export interface DeadlineItem {
  title: string;
  description: string;
  category: 'conference' | 'competition' | 'activity';
  tags: string[];
  events: EventData[];
}

// 判断事件是否已结束 (已适配 React Native)
export function isEventEnded(event: EventData): boolean {
  if (!event.timeline || event.timeline.length === 0) {
    return false;
  }
  const lastDeadlineStr = event.timeline[event.timeline.length - 1].deadline;
  const lastDeadline = new Date(lastDeadlineStr);
  return lastDeadline.getTime() < Date.now();
}
