import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto/group.dto';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}
  @Post()
  @HttpCode(201)
  async create(@Body() groupDto: GroupDto) {
    return await this.groupService.create(groupDto);
  }
}
