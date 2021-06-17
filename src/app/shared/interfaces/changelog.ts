export interface ChangelogItem {
  type: string;
  typeCSS: string;
  betaFlag: boolean;
  location: string;
  content: string;
}

export interface ChangelogVersion {
  versionNumber: string;
  releaseDate: string;
  newMessageAvailable?: boolean; // Optional to be backwards-compatible
  betaUpdate: boolean;
  items: ChangelogItem[];
}
