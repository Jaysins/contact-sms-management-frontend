import {Group} from "./general.models";

export interface SenderId {
  id: string;
  code: string;
  name: string;
  active: boolean;
  selected: boolean;
  group: Group,
  dateCreated: string;
}
