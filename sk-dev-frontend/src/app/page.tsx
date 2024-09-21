import { Container } from '@/components/shared';
import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/posts');
	return (
		<div className="flex flex-col gap-5">
			<Container className="flex flex-col gap-5 w-full"></Container>
		</div>
	);
}
