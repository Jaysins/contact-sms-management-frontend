import {Group} from "./general.models";

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  group: Group;
  active: boolean;
  selected: boolean;
  dateCreated: string;
}
