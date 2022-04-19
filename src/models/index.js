// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Aircraft, Instructor, Student, Profile, Schedule, Note } = initSchema(schema);

export {
  Aircraft,
  Instructor,
  Student,
  Profile,
  Schedule,
  Note
};