'use client';
import { useEffect, useState } from 'react';
import { Api } from '@/services/api/api-client';
import { useUser } from '@/contexts/UserContext';
import { Heart, HeartPulse } from 'lucide-react';
import useSWR from 'swr';

type Like = {
	commentId: string;
	createdAt: string;
	id: string;
	postId: string;
	userId: string;
};

interface LikeProps {
	id: string;
}

const fetcher = async (id: string) => {
	const { data } = await Api.getPostLikes(id);
	return data;
};

const Likes = ({ id }: LikeProps) => {
	const { data, mutate } = useSWR(`likes-${id}`, () => fetcher(id));
	const user = useUser();
	const liked = data?.some((like: Like) => like.userId === user?.user?.id);
	const [isLiked, setIsLiked] = useState(liked);
	const [likesCount, setLikesCount] = useState(data?.length);

	const toggleLikePost = async () => {
		await Api.likePost(id);
		mutate();
	};

	useEffect(() => {
		setIsLiked(liked);
		setLikesCount(data?.length);
	}, [liked]);

	if (!data) {
		return null;
	}

	return (
		<div className="flex gap-3 items-center text-gray-500">
			{isLiked ? (
				<HeartPulse
					size={21}
					className="cursor-pointer text-red-500 hover:scale-110 transition-all"
					onClick={toggleLikePost}
				/>
			) : (
				<Heart
					size={21}
					className="cursor-pointer hover:scale-x-110 transition-all"
					onClick={toggleLikePost}
				/>
			)}
			{likesCount}
		</div>
	);
};

export default Likes;
