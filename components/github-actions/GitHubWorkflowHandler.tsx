import { Box, Spinner } from '@chakra-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { GetWorkflows } from '../../lib/github/Workflows';
import GitHubWorkflowCard from './GitHubWorkflowCard';

interface IGitHubWorkflowHandlerProps {
  githubToken: string;
  repositoryName: string;
}

export default function GitHubWorkflowHandler(props: IGitHubWorkflowHandlerProps) {
  const { isLoading, data, isFetching, refetch } = useQuery(
    `${props.repositoryName}-workflows`,
    () => GetWorkflows(props.githubToken, props.repositoryName),
    {
      refetchInterval: 10000,
    }
  );

  const latestWorkflow = data ? data.workflow_runs[0] : null;

  return isLoading ? (
    <Box minHeight="250px">
      <Spinner />
    </Box>
  ) : (
    <GitHubWorkflowCard
      repositoryName={props.repositoryName}
      repositoryUrl={latestWorkflow.repository.html_url}
      lastRunStatus={latestWorkflow.conclusion ? latestWorkflow.conclusion : latestWorkflow.status}
      branchName={latestWorkflow.head_branch}
      createdAt={latestWorkflow.updated_at}
      isFetching={isFetching}
      refreshDataFunction={refetch}
    />
  );
}
