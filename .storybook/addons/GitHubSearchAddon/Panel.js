// .storybook/addons/GitHubSearchAddon/Panel.js
import React, { useState, useEffect } from 'react';
import {
  useAddonState,
  useStorybookApi,
  useStorybookState,
} from '@storybook/manager-api';

import styled from 'styled-components';

import { Button, Checkbox } from '@equinor/eds-core-react';
import { AddonPanel } from '@storybook/components';
import { ADDON_ID } from './constants';

const extractComponentName = (filePath) => {
  const regex = /\/([^/]+)\.stories\.tsx$/;
  const match = filePath.match(regex);
  return match ? match[1] : null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif !important;

  .checkbox-container {
    display: flex;
  }

  button {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;

    &:disabled {
      font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Open Sans',
        'Helvetica Neue',
        sans-serif;
    }
  }
`;
const RepoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;
const RepoCard = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 16px;

  max-width: 512px;
  box-shadow:
    0px 2px 4px 0px rgba(0, 0, 0, 0.14),
    0px 3px 4px 0px rgba(0, 0, 0, 0.12);

  h2 {
    font-weight: bold;
  }
  ul {
    list-style-type: none;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li a {
      color: #007079;
      transition: color 200ms;
      &:hover {
        color: #004f55;
      }
    }
  }
`;

// Define your component with the Storybook APIs
const GitHubSearchPanel = ({ active }) => {
  if (!active) return null;

  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryWord, setQueryWord] = useState('');

  const api = useStorybookApi(); // Get Storybook API instance

  const token = '{github-personal-token}'; // Replace this securely as mentioned
  const perPage = 100; // Adjust as needed

  const repoList = [
    'equinor/inpress',
    'equinor/recap',
    'equinor/acquire',
    'equinor/ToolsQualificationList',
    'equinor/4DInsight',
    'equinor/orca',
    'equinor/premo',
    'equinor/petec-well-experience',
    'equinor/dasha',
  ];
  const [selectedRepos, setSelectedRepos] = useState(
    repoList.reduce((acc, repo) => ({ ...acc, [repo]: true }), {})
  );
  useEffect(() => {
    const currentStory = api.getCurrentStoryData();
    console.log(currentStory);
    let currentComponentName = '';

    const currentComponentPath = currentStory
      ? currentStory.importPath
      : undefined;
    console.log(currentComponentPath);

    currentComponentName = extractComponentName(
      currentComponentPath ? currentComponentPath : ''
    );

    if (currentComponentName) {
      currentComponentName ? setQueryWord(currentComponentName) : '';
    }
  }, [api]);

  const handleRepoToggle = (repo) => {
    setSelectedRepos((prevSelectedRepos) => ({
      ...prevSelectedRepos,
      [repo]: !prevSelectedRepos[repo],
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const selectedRepoList = repoList.filter((repo) => selectedRepos[repo]);
    const query = `"<${queryWord}" ${selectedRepoList.map((repo) => `repo:${repo}`).join(' ')}`;

    const repoMap = {};
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `https://api.github.com/search/code?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error('GitHub API response was not ok');
        }

        const data = await response.json();
        console.log(data);

        hasMore = data.items.length === perPage;

        data.items.forEach((item) => {
          const repoName = item.repository.full_name;
          if (!repoMap[repoName]) {
            repoMap[repoName] = [];
          }
          repoMap[repoName].push({
            name: item.name,
            html_url: item.html_url,
            repository: { name: repoName },
          });
        });

        page += 1;
      } catch (err) {
        setError(err.message);
        break;
      }
    }

    setLoading(false);
    setRepos(repoMap);
  };

  return (
    <Container>
      {/*       <input
        type="text"
        value={queryWord}
        onChange={(e) => setQueryWord(e.target.value)}
        placeholder="Enter search query"
      /> */}
      <div className="checkbox-container">
        {repoList.map((repo) => (
          <label key={repo}>
            <Checkbox
              checked={!!selectedRepos[repo]}
              onChange={() => handleRepoToggle(repo)}
            />
            {repo}
          </label>
        ))}
      </div>

      <Button onClick={handleSearch} disabled={loading || queryWord === ''}>
        Search for {queryWord} in Repositories
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <RepoCardContainer>
        {Object.keys(repos).map((repoName) => (
          <RepoCard key={repoName}>
            <h2>{repoName}</h2>
            <p>Number of occurrences: {repos[repoName].length}</p>
            <ul>
              {repos[repoName].map((file) => (
                <li key={file.html_url}>
                  <a
                    href={file.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </RepoCard>
        ))}
      </RepoCardContainer>
    </Container>
  );
};

export default (props) => (
  <AddonPanel {...props}>
    <GitHubSearchPanel {...props} />
  </AddonPanel>
);
