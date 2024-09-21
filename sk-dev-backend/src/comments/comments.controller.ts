import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetUserId } from 'src/users/decorators/userId.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  @UseGuards(AuthGuard)
  async createComment(
    @Param('postId') postId: string,
    @GetUserId('id') currentUserId: string,
    @Body('content') content: string,
  ) {
    return this.commentsService.createComment(postId, currentUserId, content);
  }

  @Patch(':commentId')
  @UseGuards(AuthGuard)
  async updateComment(
    @Param('commentId') commentId: string,
    @GetUserId('id') currentUserId: string,
    @Body('content') content: string,
  ) {
    return this.commentsService.updateComment(
      commentId,
      content,
      currentUserId,
    );
  }

  @Get(':postId')
  async getCommentsByPost(@Param('postId') postId: string) {
    return this.commentsService.getCommentsByPost(postId);
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param('commentId') commentId: string,
    @GetUserId('id') currentUserId: string,
  ) {
    return this.commentsService.deleteComment(commentId, currentUserId);
  }
}
