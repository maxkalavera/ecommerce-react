import { DialogProps } from "@radix-ui/react-dialog";


export interface Instance {
  key: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image extends Instance {
  isCover: boolean;
  mimeType: string;
  url: string;
}

export type DialogComponent = React.FC<DialogProps>;