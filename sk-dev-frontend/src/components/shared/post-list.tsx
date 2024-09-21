/* eslint-disable @next/next/no-img-element */
'use client';

import useSWR from 'swr';
import { formatDate } from '@/lib/utils';
import { Api } from '@/services/api/api-client';
import Link from 'next/link';
import React from 'react';
import Likes from './likes';

interface Post {
	id: string;
	slug: string;
	title: string;
	description: string;
	image: string;
	createdAt: string;
}

const fetcher = async () => {
	const response = await Api.getPosts();
	return response.data;
};

export const PostList = ({ initialData }: { initialData: Post[] }) => {
	const { data, error } = useSWR('posts', fetcher, {
		fallbackData: initialData,
	});

	if (error)
		return (
			<div className="text-red-500 text-center font-bold mb-4 py-4 text-xl w-full bg-red-100 rounded shadow">
				Error loading posts
			</div>
		);
	if (!data)
		return (
			<div className="text-center font-bold mb-4 py-4 text-xl w-full bg-gray-100 rounded shadow">
				Loading...
			</div>
		);

	return (
		<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.map((post: Post) => (
				<li
					key={post.slug}
					className="p-4 border border-gray-300 rounded-lg hover:shadow-lg"
				>
					<Link href={`/posts/${post.slug}`}>
						<div className="flex flex-col gap-4">
							<img
								src={post.image}
								alt={post.title}
								width={320}
								height={170}
								className="w-full h-[170px] object-contain"
							/>
							<div className="flex flex-col gap-2">
								<div className="text-2xl font-medium text-blue-500 hover:text-blue-700">
									{post.title}
								</div>
								<p className="text-gray-500 truncate" title={post.description}>
									{post.description}
								</p>
							</div>
						</div>
					</Link>
					<div className="flex justify-between items-center h-6">
						<div className="text-gray-500 text-xs">
							{formatDate(post.createdAt)}
						</div>
						<Likes id={post.id} />
					</div>
				</li>
			))}
		</ul>
	);
};
