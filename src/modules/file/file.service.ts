import { BadRequestException, Injectable } from "@nestjs/common";
import * as process from "process";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";
import { UploadFileEntity } from "./entities/file.entity";

@Injectable()
export class FileService {
  #s3: S3;

  constructor() {
    this.#s3 = new AWS.S3({
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.R2_ACCESS_KEY_SECRET}`
      },
      signatureVersion: "v4"
    });
  }

  #generateString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async upload(file: Express.Multer.File): Promise<UploadFileEntity> {
    const key = `${this.#generateString(10).replace(" ", "")}${file.originalname.replace(" ", "").toLowerCase().replace(/[^a-zA-Z ]/g, "")}`;
    const uploadParams = {
      Bucket: process.env.R2_BUCKET,
      Body: file.buffer,
      Key: key
    };

    await this.#s3.putObject(uploadParams, (err, data) => {
      console.log(err);
    });
    return {
      key
    };
  }

  async findOne(id: string) {
    console.log(id,'key');
    const downloadParams = {
      Key: id,
      Bucket: process.env.R2_BUCKET
    };
    return this.#s3.getObject(downloadParams).createReadStream()
  }

  async remove(id: string) {
    console.log(id);
    const params = {
      Key: id,
      Bucket: process.env.R2_BUCKET
    };
    await this.#s3.deleteObject(params, (err, data) => {
      /*console.log(err)
      console.log(data)*/
    });
    return {
      message: "deleted"
    };
  }
}
