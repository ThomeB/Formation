// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Schedule, Instructor, Student, Aircraft, Note } = initSchema(schema);

export {
  Schedule,
  Instructor,
  Student,
  Aircraft,
  Note
};