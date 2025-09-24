export interface Alarm {
  id: string;
  time: Date;
  label: string;
  tone: string;
  isActive: boolean;
}