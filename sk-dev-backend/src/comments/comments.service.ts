import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(postId: string, authorId: string, content: string) {
    // Перевірка, чи існує пост
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Створення коментаря
    return this.prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    });
  }

  async updateComment(
    commentId: string,
    content: string,
    currentUserId: string,
  ) {
    return await this.prisma.comment.update({
      where: { id: commentId, authorId: currentUserId },
      data: { content },
    });
  }

  async getCommentsByPost(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
        likes: true,
      },
    });
  }

  async deleteComment(commentId: string, currentUserId: string) {
    return await this.prisma.comment.delete({
      where: { id: commentId, authorId: currentUserId },
    });
  }
}
