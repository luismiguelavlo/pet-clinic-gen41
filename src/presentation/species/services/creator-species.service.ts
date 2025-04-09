import { envs, generateUUID, UploadFilesCloudAdapter } from '../../../config';
import { Specie } from '../../../data/postgres/models/specie.model';
import { CustomError } from '../../../domain';
import { CreateSpecieDto } from '../../../domain/dtos/species/create-specie.dto';

export class CreatorSpeciesService {
  async execute(
    specieData: CreateSpecieDto,
    files: Express.Multer.File[] | undefined
  ) {
    let keys: string[] = [];

    if (files && files.length > 0) {
      const keysPromises = files.map(async (file) => {
        return await UploadFilesCloudAdapter.uploadSingleFile({
          bucketName: envs.AWS_BUCKET_NAME,
          key: `species/${generateUUID()}-${file.originalname}`,
          body: file.buffer,
          contentType: file.mimetype,
        });
      });

      keys = await Promise.all(keysPromises);
      console.log(keys);
    }

    const specie = new Specie();
    specie.name = specieData.name;
    specie.img_url = keys;

    try {
      await specie.save();
      return {
        message: 'Specie created sucessfully',
      };
    } catch (error) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('specie already exist');
    }

    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServer('Error trying to create specie');
  }
}
