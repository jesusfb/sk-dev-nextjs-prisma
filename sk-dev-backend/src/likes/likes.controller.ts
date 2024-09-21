import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserId } from 'src/users/decorators/userId.decorator';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('posts/:postId')
  @UseGuards(AuthGuard)
  async togglePostLike(
    @Param('postId') postId: string,
    @GetUserId('id') currentUserId: string,
  ): Promise<any> {
    return await this.likesService.togglePostLike(postId, currentUserId);
  }

  @Post('comment/:commentId')
  @UseGuards(AuthGuard)
  async toggleCommentLike(
    @Param('commentId') commentId: string,
    @GetUserId('id') currentUserId: string,
  ): Promise<any> {
    return await this.likesService.toggleCommentLike(commentId, currentUserId);
  }

  @Get('posts/:postId')
  getPostLikes(@Param('postId') postId: string) {
    return this.likesService.getPostLikes(postId);
  }

  @Get('comments/:commentId')
  getCommentLikes(@Param('commentId') commentId: string) {
    return this.likesService.getCommentLikes(commentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(id);
  }
}
