import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserId } from 'src/users/decorators/userId.decorator';
import { Post as PostModel } from '@prisma/client';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @GetUserId() currentUserId: string,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostModel> {
    return this.postsService.create(currentUserId, createPostDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<PostModel[]> {
    return await this.postsService.findAll(query);
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string): Promise<PostModel> {
    return await this.postsService.getPostBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @GetUserId() currentUserId: string,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return await this.postsService.update(postId, updatePostDto, currentUserId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @GetUserId('id') currentUserId: string,
  ) {
    return await this.postsService.remove(id, currentUserId);
  }
}
