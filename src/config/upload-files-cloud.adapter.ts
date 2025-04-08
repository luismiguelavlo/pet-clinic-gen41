import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { s3Client } from './s3.adapter';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface PropsUploadFile {
  bucketName: string;
  key: string;
  body: Buffer;
  contentType: string;
}

interface PropsGetFile {
  bucketName: string;
  key: string;
}

export class UploadFilesCloudAdapter {
  static async uploadSingleFile(props: PropsUploadFile): Promise<string> {
    const { bucketName, key, body, contentType } = props;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await s3Client.send(command);

    return key;
  }

  static async getFile(props: PropsGetFile): Promise<string> {
    const params = {
      Bucket: props.bucketName,
      Key: props.key,
      ACL: 'private',
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url;
  }

  static async deleteFile(props: PropsGetFile): Promise<void> {
    const params = {
      Bucket: props.bucketName,
      Key: props.key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
  }
}
