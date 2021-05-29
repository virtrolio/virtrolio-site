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
    betaUpdate: boolean;
    items: ChangelogItem[];
}
