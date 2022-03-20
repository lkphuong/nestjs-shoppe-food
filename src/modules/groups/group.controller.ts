import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto/group.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Roles(ROLE.MASTER)
  @Post()
  @HttpCode(201)
  async create(@Body() groupDto: GroupDto) {
    return await this.groupService.create(groupDto);
  }
}
