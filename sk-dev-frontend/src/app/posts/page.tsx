import { Api } from '@/services/api/api-client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PostList } from '@/components/shared';



const PostsPage = async () => {
	const { data } = await Api.getPosts();

	return (
		<div className="container mx-auto py-12 flex flex-col gap-8">
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-bold">Posts</h1>
				<Link href="/posts/create">
					<Button variant="link">Create</Button>
				</Link>
			</div>
			<PostList initialData={data} />
		</div>
	);
};

export default PostsPage;
