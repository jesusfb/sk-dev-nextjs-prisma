import { Api } from '@/services/api/api-client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleList } from '@/components/shared';



const ArticlesPage = async () => {
	const { data } = await Api.getArticles();

	return (
		<div className="container mx-auto py-12 flex flex-col gap-8">
			<div className="flex justify-between items-center">
				<h1 className="text-4xl font-bold">Articles</h1>
				<Link href="/articles/create">
					<Button variant="link">Create</Button>
				</Link>
			</div>
			<ArticleList initialData={data} />
		</div>
	);
};

export default ArticlesPage;
