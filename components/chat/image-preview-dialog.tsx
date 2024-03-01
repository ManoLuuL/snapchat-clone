import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import Image from "next/image";
import { ImagePreviewDialogProps } from "./types";

const ImagePreviewDialog = ({
  selectedFile,
  onClose,
  onImageChange,
  setStep,
}: ImagePreviewDialogProps) => (
  <Dialog open={!!selectedFile}>
    <DialogContent
      className="bg-sigMain border border-sigColorBgBorder md:max-w-3xl max-w-xl h-[80vh] flex flex-col"
      onInteractOutside={onClose}
    >
      <DialogHeader className="flex-1">
        <div className="flex items-center relative h-3/4 my-auto">
          <Image
            src={selectedFile!}
            alt="Selected File"
            fill
            className="rounded-md border mx-auto border-sigColorBgBorder object-contain"
          />
        </div>
      </DialogHeader>
      <DialogFooter className="mx-auto flex items-center">
        <DialogClose asChild>
          <Button
            variant="destructive"
            size={"sm"}
            onClick={onClose}
            className="rounded-full bg-sigSnapImg"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          size={"sm"}
          onClick={onImageChange}
          className="rounded-full px-4"
        >
          Change
        </Button>
        <Button
          size={"sm"}
          onClick={() => setStep && setStep(1)}
          className="rounded-full bg-sigSnapChat px-4  hover:bg-sigSnapChat "
        >
          Next
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ImagePreviewDialog;
