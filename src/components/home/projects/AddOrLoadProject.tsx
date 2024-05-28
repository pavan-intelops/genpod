import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Flex, Text, Tooltip } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { Checkbox, Select, TextInput } from 'react-hook-form-mantine';
import { useNavigate } from 'react-router-dom';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { Project } from 'src/components/user/projects/types';
import { useSyncActions } from 'src/hooks/useSyncActions';
import { useProjectStore } from 'src/store/useProjectStore';
import useUserStore from 'src/store/userStore';
import { convertToSelectOptionItems } from 'src/utils/transformers';
// skipcq: JS-C1003
import * as z from 'zod';
import classes from './AddOrLoadProject.module.css';
import { AddNewForm } from './AddOrLoadProject.types';
import { useEffect } from 'react';

const resolver = z.object({
  name: z.string().min(1, 'Project Name is required'),
  gitPlatform: z.string().min(1, 'Select a Git Platform'),
  repositoryBranch: z.string().min(1, 'Repository Branch is required'),
  repositoryName: z.string().min(1, 'Repository Name is required'),
  isRepositoryPublic: z.boolean()
});

export default function AddOrLoadProject() {
  const {
    gitPlatformStore,
    personalDetails: { email }
  } = useUserStore();
  const { postProject } = useProjectOperations();

  const setActiveProject = useProjectStore(state => state.setActiveProject);

  const projects = useProjectStore(state => state.projects);

  const navigate = useNavigate();
  const areGitPlatformsThere = gitPlatformStore.gitPlatforms.length > 0;
  const handleOnAddGitPlatformClick = () => {
    navigate('/profile?activeTab=gitPlatforms');
  };
  const addNewForm = useForm<AddNewForm>({
    defaultValues: {
      gitPlatform: '',
      isRepositoryPublic: true,
      name: '',
      repositoryBranch: '',
      repositoryName: ''
    },
    resolver: zodResolver(resolver),
    mode: 'onChange'
  });
  const { syncProjects, syncGitPlatforms } = useSyncActions();

  useEffect(() => {
    syncGitPlatforms();
    syncProjects();
  }, []);

  const handleOnSubmit = addNewForm.handleSubmit(async data => {
    const username = gitPlatformStore.gitPlatforms.find(
      platform => platform.gitPlatform === data.gitPlatform
    )?.username as string;
    const project: Project = {
      displayName: data.name,
      gitPlatformName: data.gitPlatform,
      isRepositoryPublic: data.isRepositoryPublic,
      version: 'v1',
      repositoryBranch: data.repositoryBranch,
      repositoryName: data.repositoryName,
      repositoryUrl: `https://www.github.com/${username}/${data.repositoryName}`,
      gitPlatformUserName: username,
      ownerEmail: email,
      id: '',
      json: {
        edges: {},
        nodes: {}
      },
      metadata: {
        licenses: []
      }
    };
    const { error } = await postProject(project);
    if (error) {
      return;
    }
    // if post request is successfully completed, sync the projects
    await syncProjects();
  });

  const handleOnLoadedProjectClick = (projectId: string) => {
    setActiveProject(projectId);
    // navigate to the project page
    navigate(`/project/${projectId}`);
  };
  return (
    <Box className={classes.container}>
      <Text size="xl" fw="bolder">
        Add Or Load Project
      </Text>
      <Flex className={classes.formContainer}>
        <Box w="50%" p="md" bg="dark" className={classes.form}>
          <form onSubmit={handleOnSubmit}>
            <Flex rowGap="md" direction="column">
              <Text size="md">Add New Project</Text>
              <TextInput
                withAsterisk
                control={addNewForm.control}
                name="name"
                placeholder="Project Name"
                label="Project Name"
              />
              {areGitPlatformsThere ? (
                <Select
                  placeholder="Select Git Platform"
                  selectFirstOptionOnChange={false}
                  control={addNewForm.control}
                  name="gitPlatform"
                  label="Git Platform"
                  data={convertToSelectOptionItems(
                    gitPlatformStore.gitPlatforms,
                    'gitPlatform',
                    'gitPlatform'
                  )}
                />
              ) : (
                <Flex columnGap="xs">
                  <Tooltip label="Please add Git Platform first">
                    {/* Had to add Box component around select component because pointer events will not work on disabled select component */}
                    <Box>
                      <Select
                        flex={1}
                        selectFirstOptionOnChange={false}
                        disabled
                        placeholder="Select Git Platform"
                        control={addNewForm.control}
                        name="gitPlatform"
                      />
                    </Box>
                  </Tooltip>
                  <Button
                    variant="transparent"
                    c="orange.6"
                    onClick={handleOnAddGitPlatformClick}
                  >
                    Add Git Platforms
                  </Button>
                </Flex>
              )}
              <TextInput
                control={addNewForm.control}
                name="repositoryName"
                placeholder="Repository Name"
                label="Repository Name"
              />
              <TextInput
                control={addNewForm.control}
                name="repositoryBranch"
                placeholder="Repository Branch"
                label="Repository Branch"
              />
              <Checkbox
                control={addNewForm.control}
                name="isRepositoryPublic"
                label="Is Repository Public"
              />
              <Button type="submit">Add Project</Button>
            </Flex>
          </form>
        </Box>
        <Box w="50%" p="md" bg="dark" className={classes.form}>
          <Text size="lg" fw="bold">
            Load Project
          </Text>
          <Text size="sm">Click on the project to load</Text>
          <Divider my="sm" />
          <Flex direction="row" wrap="wrap" gap="lg">
            {projects.map((project, index) => (
              <Box key={index}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOnLoadedProjectClick(project.id)}
                >
                  {project.displayName}
                </Button>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
