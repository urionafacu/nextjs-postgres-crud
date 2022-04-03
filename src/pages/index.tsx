import { Task } from 'src/interfaces/Task';
import { Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import TasksList from 'src/components/tasks/TasksList';

interface Props {
  tasks: Task[];
}

const Home = ({ tasks }: Props) => {
  const router = useRouter();

  if (tasks.length === 0) {
    return (
      <Grid columns={3} centered verticalAlign='middle' style={{ height: '70%' }}>
        <Grid.Row>
          <Grid.Column>
            <h1>No tasks yet</h1>
            <Button onClick={() => router.push('/tasks/new')}>Create one</Button>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    );
  }


  return (
    <TasksList tasks={tasks} />
  )
};

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/tasks/');
    const tasks = await response.json();
    return {
      props: {
        tasks,
      }
    }
  } catch (error) {
    return {
      props: {
        tasks: [],
      }
    }
  }
};

export default Home;