import { HttpException, HttpStatus } from "@nestjs/common";

export const imageUploadOptions = {
  // Enable file size limits
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type`, HttpStatus.BAD_REQUEST), false);
    }
  }
};