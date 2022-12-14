export type TCliGlobalOptions = {
  '--'?: string[];
};

export type TCliCommandOptions = {
  template: 'javascript' | 'typescript';
  templateVersion: string;
  skipInstall: boolean;
  yes: boolean;
};

export type TCliTaskOptions = {
  projectDirectoryName: string;
  projectDirectoryPath: string;
  templateName: TCliCommandOptions['template'];
  tagOrBranchVersion: string;
};
