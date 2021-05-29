export interface Contributor {
    name: string;
    images: {
        regular: string,
        silly: string
    };
    blurb: string;
    sharingLink: string;
    social: {
        github: string,
        instagram: string,
        linkedIn: string,
        website: string
    };
}
