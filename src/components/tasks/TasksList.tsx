import { Card } from 'semantic-ui-react';
import { Task } from 'src/interfaces/Task'
import Layout from '../Layout';

interface Props {
	tasks: Task[];
}

const TasksList = ({ tasks }: Props) => {
	return (
		<Layout>
			<Card.Group itemsPerRow={4}>
				{tasks.map((t) => (
					<Card key={t.id}>
						<Card.Content>
							<Card.Header>{t.title}</Card.Header>
							<Card.Meta>{new Date(t.created_on!).toLocaleDateString()}</Card.Meta>
							<Card.Description>{t.description}</Card.Description>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
		</Layout>
	);
}

export default TasksList