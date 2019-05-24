import { Time } from '@angular/common';

// https://stackoverflow.com/questions/3282403/database-schema-for-timesheet

export interface IProject {
      _id: number;
      name: string;
      projectId: string;
}

export interface ISubProject {
      _id: number;
      projectId: number;
      name: string;
}

export interface IWorkSegment {
      _id: number;
      subProjectId: number;
      userId: number;
      payrollCycleId: number;
      date: Date;
      start: Time;
      end: Time;
      total: number;
      comment: string;
}

export interface ITimeSheet {
      _id: number;
      userId: number;
      payrollCycleId: number;
}

export interface ITimeSheetSegment {
      _id: number;
      subProjectId: number;
      userId: number;
      payrollCycleId: number;
}

export interface IApproval {
      _id: number;
      timeSheetId: number;
      payrollCycleId: number;
      submitedTime: Date;
      approvedBy: number;
      approvedTime: Date;
}

export interface IPayrollCycle {
      _id: number;
      year: number;
      number: number;
      start: Date;
      end: Date;
      deposit: Date;
      check: Date;
      total: number;
}