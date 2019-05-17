export const priorities: IPriority[] = [
  { priority: 0, name: 'APPLICATION.Common.Priority.No-Priority', color: 'transparent' },
  { priority: 1, name: 'APPLICATION.Common.Priority.Low', color: 'blue' },
  { priority: 2, name: 'APPLICATION.Common.Priority.Moderate', color: 'green' },
  { priority: 3, name: 'APPLICATION.Common.Priority.High', color: 'yellow' },
  { priority: 4, name: 'APPLICATION.Common.Priority.Critical', color: 'orange' },
  { priority: 5, name: 'APPLICATION.Common.Priority.Immediate', color: 'red' }
];

export interface IPriority {
  priority: number;
  name: string;
  color: string;
}