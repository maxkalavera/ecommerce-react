import { DialogComponent } from "@/types/commons";
import SearchDialog from "@/dialogs/SearchDialog";

type DialogObject = {[key: string]: DialogComponent};

export default {
  "search-dialog": SearchDialog
} as DialogObject;