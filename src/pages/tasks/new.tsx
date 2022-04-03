import { Button, Card, Form, Icon } from 'semantic-ui-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Task } from 'src/interfaces/Task';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';

const NewPage = () => {
	const [task, setTask] = useState({
		title: '',
		description: '',
	});

	const router = useRouter();

	const handleChange = ({
		target: { value, name },
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask(({ ...task, [name]: value, }));

	const createTask = async (task: Task) => {
		await fetch('http://localhost:3000/api/tasks/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createTask(task);
			router.push('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Layout>
			<Card>
				<Card.Content>
					<Form onSubmit={handleSubmit}>
						<Form.Field>
							<label htmlFor='title'>Title: </label>
							<input onChange={handleChange} type='text' placeholder='Write your title' name='title' />
						</Form.Field>
						<Form.Field>
							<label htmlFor='description'>Description: </label>
							<textarea onChange={handleChange} name='description' rows={2} placeholder='Write a description' />
						</Form.Field>
						<Button type='submit'>
							<Icon name='save' />
							Save
						</Button>
					</Form>
				</Card.Content>
			</Card>
		</Layout>
	)
};

export default NewPage;