import { Test, TestingModule } from '@nestjs/testing';
import { StakeholdersResolver } from './stakeholders.resolver';

describe('StakeholdersResolver', () => {
  let resolver: StakeholdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakeholdersResolver],
    }).compile();

    resolver = module.get<StakeholdersResolver>(StakeholdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
