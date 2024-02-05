import { AccessRoles } from './AccessRole';

export type AmplifyApplication = {
  id: string;
  name: string;
  adGroups: Array<string>;
  url: string;
  accessRoles: Array<AccessRoles>;
  description: string;
  longDescription: string;
  category: string;
  version: string;
  applicationInsightAPI: string;
  apI_Id: string;
  apiurl: string;
  monitored: boolean;
  productOwners: Array<string>;
};
