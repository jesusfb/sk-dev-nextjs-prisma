import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    currentUserId: string,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        slug: this.getSlug(createPostDto.title),
        author: {
          connect: { id: currentUserId },
        },
      },
    });

    return post;
  }

  async findAll(query: any): Promise<Post[]> {
    try {
      const conditions: Prisma.PostWhereInput = {};

      const take = query.limit ? parseInt(query.limit, 10) : undefined;
      const skip = query.offset ? parseInt(query.offset, 10) : undefined;

      if (query.search) {
        conditions.title = {
          contains: query.search,
          mode: 'insensitive',
        };
      }

      if (query.author) {
        conditions.author = {
          username: {
            contains: query.author,
            mode: 'insensitive',
          },
        };
      }

      return await this.prisma.post.findMany({
        where: conditions,
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      });
    } catch (error) {
      throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
    }
  }

  async getPostBySlug(slug: string) {
    const post = await this.prisma.post.findFirstOrThrow({
      where: { slug },
      include: {
        author: true,
        likes: true,
      },
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    delete post.author.password;
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    currentUserId: string,
  ) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (post.authorId !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    try {
      return await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
    } catch (error) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string, currentUserId: string) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });

      if (currentUserId !== post.authorId) {
        throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
      }

      await this.prisma.post.delete({
        where: { id },
      });

      return { message: 'Post deleted successfully', status: HttpStatus.OK };
    } catch (error) {
      if (error.name === 'NotFoundError') {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return error;
    }
  }

  private getSlug(title: string) {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
