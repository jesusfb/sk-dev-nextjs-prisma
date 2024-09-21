import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { LoginData, RegisterData } from '@/types';

export const Api = {
	//USERS
	login: (data: LoginData) => {
		return axiosInstance.post(ApiRoutes.LOGIN, data);
	},

	register: (data: RegisterData) => {
		return axiosInstance.post(ApiRoutes.REGISTER, data);
	},

	getUserProfile: () => {
		return axiosInstance.get(ApiRoutes.USER_PROFILE);
	},

	getUserById: (id: string) => {
		return axiosInstance.get(`${ApiRoutes.USERS}/${id}`);
	},

	//POSTS

	getPosts: () => {
		return axiosInstance.get(ApiRoutes.POSTS);
	},

	getPost: (slug: string) => {
		return axiosInstance.get(`${ApiRoutes.POSTS}/${slug}`);
	},

	createPost: (data: {
		title: string;
		content: string;
		image: string;
		description: string;
	}) => {
		return axiosInstance.post(ApiRoutes.POSTS, data);
	},

	updatePost: (
		id: string,
		data: { title: string; content: string; image: string; description: string }
	) => {
		return axiosInstance.patch(`${ApiRoutes.POSTS}/${id}`, data);
	},

	deletePost: (id: string) => {
		return axiosInstance.delete(`${ApiRoutes.POSTS}/${id}`);
	},

	//COMMENTS

	createComment: (postId: string, data: { content: string }) => {
		return axiosInstance.post(`${ApiRoutes.COMMENTS}/${postId}`, data);
	},

	editComment: (id: string, data: { content: string }) => {
		return axiosInstance.patch(`${ApiRoutes.COMMENTS}/${id}`, data);
	},

	getCommentsByPostId: (postId: string) => {
		return axiosInstance.get(`${ApiRoutes.COMMENTS}/${postId}`);
	},

	deleteComment: (id: string) => {
		return axiosInstance.delete(`${ApiRoutes.COMMENTS}/${id}`);
	},

	//LIKES

	likePost: (id: string) => {
		return axiosInstance.post(`${ApiRoutes.LIKES_POST}/${id}`);
	},

	likeComment: (id: string) => {
		return axiosInstance.post(`${ApiRoutes.LIKES_COMMENT}/${id}`);
	},

	getPostLikes: (postId: string) => {
		return axiosInstance.get(`${ApiRoutes.LIKES_POST}/${postId}`);
	},
};
