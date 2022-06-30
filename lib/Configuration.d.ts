interface Credentials {
    client_email: string;
    private_key: string;
}
export interface Output {
    sheetIndex: number;
    method: 'json';
    outputDir: string;
    fileName?: string;
    keyPathSeparator?: string | false;
}
export interface Configuration {
    credentials: Credentials;
    docID: string;
    outputs: Output[];
}
export declare function loadConfiguration(path: string): Configuration | undefined;
export {};
