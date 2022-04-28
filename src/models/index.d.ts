import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Role {
  INSTRUCTOR = "INSTRUCTOR",
  STUDENT = "STUDENT"
}



type NoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AircraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Note {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Note, NoteMetaData>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note, NoteMetaData>) => MutableModel<Note, NoteMetaData> | void): Note;
}

export declare class Aircraft {
  readonly id: string;
  readonly make: string;
  readonly model: string;
  readonly tail_number: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Aircraft, AircraftMetaData>);
  static copyOf(source: Aircraft, mutator: (draft: MutableModel<Aircraft, AircraftMetaData>) => MutableModel<Aircraft, AircraftMetaData> | void): Aircraft;
}

export declare class User {
  readonly id: string;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly phone_number?: string | null;
  readonly email?: string | null;
  readonly picture?: string | null;
  readonly role?: Role | keyof typeof Role | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Schedule {
  readonly id: string;
  readonly Tasks?: (Task | null)[] | null;
  readonly User?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly scheduleUserId?: string | null;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
}

export declare class Task {
  readonly id: string;
  readonly beginTask?: string | null;
  readonly endTask?: string | null;
  readonly scheduleID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Task, TaskMetaData>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task, TaskMetaData>) => MutableModel<Task, TaskMetaData> | void): Task;
}