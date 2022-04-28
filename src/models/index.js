// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Role = {
  "INSTRUCTOR": "INSTRUCTOR",
  "STUDENT": "STUDENT"
};

const { Note, Aircraft, User, Schedule, Task } = initSchema(schema);

export {
  Note,
  Aircraft,
  User,
  Schedule,
  Task,
  Role
};