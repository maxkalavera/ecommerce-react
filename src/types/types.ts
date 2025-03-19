import { DialogProps } from "@radix-ui/react-dialog";

export type ID = number | string;

export type KEY = string;

export interface Instance {
  id?: ID
  key?: KEY;
}

export interface ResizableImage extends Instance {
  image: string;
  thumbnail?: string;
}

export type DialogComponent = React.FC<DialogProps>;