import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InstructorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StudentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AircraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Schedule {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
}

export declare class Instructor {
  readonly id: string;
  readonly Students?: (Student | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Instructor, InstructorMetaData>);
  static copyOf(source: Instructor, mutator: (draft: MutableModel<Instructor, InstructorMetaData>) => MutableModel<Instructor, InstructorMetaData> | void): Instructor;
}

export declare class Student {
  readonly id: string;
  readonly instructorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Student, StudentMetaData>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student, StudentMetaData>) => MutableModel<Student, StudentMetaData> | void): Student;
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