import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AircraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InstructorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StudentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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

export declare class Instructor {
  readonly id: string;
  readonly Students?: (Student | null)[] | null;
  readonly Profile?: Profile | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly instructorProfileId?: string | null;
  constructor(init: ModelInit<Instructor, InstructorMetaData>);
  static copyOf(source: Instructor, mutator: (draft: MutableModel<Instructor, InstructorMetaData>) => MutableModel<Instructor, InstructorMetaData> | void): Instructor;
}

export declare class Student {
  readonly id: string;
  readonly instructorID: string;
  readonly Profile?: Profile | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly studentProfileId?: string | null;
  constructor(init: ModelInit<Student, StudentMetaData>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student, StudentMetaData>) => MutableModel<Student, StudentMetaData> | void): Student;
}

export declare class Profile {
  readonly id: string;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly phone_number?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Profile, ProfileMetaData>);
  static copyOf(source: Profile, mutator: (draft: MutableModel<Profile, ProfileMetaData>) => MutableModel<Profile, ProfileMetaData> | void): Profile;
}

export declare class Schedule {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
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