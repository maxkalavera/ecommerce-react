import { DialogProps } from "@radix-ui/react-dialog";

export type ID = number | string;

export interface Instance {
  id?: ID
}

export interface ResizableImage extends Instance {
  image: string;
  thumbnail?: string;
}

export type DialogComponent = React.FC<DialogProps>;