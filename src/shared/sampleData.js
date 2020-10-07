
const Data = {
  actions: {
    'action-1': {id: 'action-1', tools: ['git', 'weh'], skills: ['backend dev'], description: ''},
    'action-2': {id: 'action-2', tools: [], skills: ['web dev', 'app design', 'number theory'], description: ''},
    'action-3': {id: 'action-3', tools: ['MATLAB', 'adobe XD', 'Rhino3D'], skills :['web dev', 'app design', 'number theory'], description: 'I did somethin'},
    'action-4': {id: 'action-4', tools: [], skills: [], description: 'yeh this that blah'},
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Task 1',
      actionIds: ['action-1', 'action-2', 'action-3', 'action-4'],
    },
    'task-2': {
      id: 'task-2',
      title: 'Task 2',
      actionIds: [],
    }
  },
  taskOrder: ['task-1', 'task-2'],
};

export default Data;
