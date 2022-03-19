import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDto } from './dto/group.dto';
import { GroupEntity } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
  ) {}

  async create(groupDto: GroupDto) {
    return await this.groupRepository.save(groupDto);
  }
}
