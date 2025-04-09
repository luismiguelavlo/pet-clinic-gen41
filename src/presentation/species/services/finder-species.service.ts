import { envs, UploadFilesCloudAdapter } from '../../../config';
import { Specie } from '../../../data/postgres/models/specie.model';
import { CustomError } from '../../../domain';

export class FinderSpeciesService {
  async execute() {
    try {
      const species = await Specie.find();

      const speciesWithImg = await Promise.all(
        species.map(async (specie) => {
          const resolvedImgs = await Promise.all(
            (specie.img_url || []).map(async (img) => {
              return await UploadFilesCloudAdapter.getFile({
                bucketName: envs.AWS_BUCKET_NAME,
                key: img,
              });
            })
          );

          return {
            ...specie,
            img_url: resolvedImgs,
          };
        })
      );

      return speciesWithImg;
    } catch (error) {
      throw CustomError.internalServer('Error finder species');
    }
  }
}
