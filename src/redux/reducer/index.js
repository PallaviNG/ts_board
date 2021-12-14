import { combineReducers } from "redux";
import { batchReducer } from "./BatchReducer";
import { trainerReducer } from './TrainerReducer';
import { studentReducer } from './StudentReducer';
import { TemplateReducer } from './TemplateReducer';
import { DynamicComponentReducer } from './DynamicComponentReducer';
import { CourseReducer } from './CourseReducer';
import { NotificationReducer } from './NotificationReducer';

let reducer = combineReducers({
  batchDetails: batchReducer,
  trainerDetails: trainerReducer,
  studentDetails: studentReducer,
  templateDetails: TemplateReducer,
  questionSetDetails: DynamicComponentReducer,
  courseDetails: CourseReducer,
  notificationDetails: NotificationReducer
});

export default reducer;
