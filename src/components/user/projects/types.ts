import { CompageJson, License } from 'src/canvas/store/types.store';

export interface Project {
  id: string;
  displayName: string;
  version: string;
  json?: CompageJson;
  gitPlatformUserName: string;
  gitPlatformName: string;
  repositoryName?: string;
  repositoryBranch?: string;
  isRepositoryPublic: boolean;
  repositoryUrl?: string;
  metadata?: Metadata;
  ownerEmail: string;
  oldVersions?: OldVersion[];
  createdAt?: string;
  updatedAt?: string;
}

interface OldVersion {
  [key: string]: string;
}

interface Metadata {
  licenses: License[];
  [key: string]: unknown;
}
