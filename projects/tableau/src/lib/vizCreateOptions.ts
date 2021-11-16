export class VizCreateOptions {
  disableUrlActionsPopups?: boolean;
  hideTabs?: boolean;
  hideToolbar?: boolean;
  instanceIdToClone?: string;
  height?: string = '100%';
  width?: string = '100%';
  device?: string;
  onFirstInteractive?: (event: any) => void;
  onFirstVizSizeKnown?: (event: any) => void;
  toolbarPosition?: (event: any) => void;
}
