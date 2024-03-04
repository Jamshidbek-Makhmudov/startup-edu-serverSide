import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/schemas/review.schema';
/** yarn test - unit test */
describe('ReviewService', () => {
  let service: ReviewService;
  let mockRepository: jest.Mocked<any>; // Adjust the type based on your repository structure

  const createReviewRepository = () => {
    const populate = jest.fn();
    const exec = jest.fn();
    return {
      find: () => ({ populate, exec }),
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getModelToken(Review.name),
          useFactory: () => createReviewRepository(),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    mockRepository = module.get(getModelToken(Review.name));
  });

  it('should getReview work as expected', async () => {
    const id = new Types.ObjectId().toHexString();
    jest.spyOn(mockRepository, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue({ exec: jest.fn().mockReturnValue([{ course: id }]) }),
    });

    const res = await service.getReview(id);
    expect(res[0].course).toBe(id);
  });
});
