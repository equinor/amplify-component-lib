// .storybook/addons/GitHubSearchAddon/Panel.js
import React, { useMemo, useState } from 'react';
import { useStorybookState } from 'storybook/manager-api';

import styled from 'styled-components';

import { Autocomplete, Button } from '@equinor/eds-core-react';
import { AddonPanel } from 'storybook/internal/components';
import { PER_PAGE, REPO_LIST } from './constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
  * {
    font-family: system-ui;
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
    0 2px 4px 0 rgba(0, 0, 0, 0.14),
    0 3px 4px 0 rgba(0, 0, 0, 0.12);

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

const extractComponentName = (filePath) => {
  const regex = /\/([^/]+)\.stories\.tsx$/;
  const match = filePath.match(regex);
  return match ? match[1] : null;
};

// Define your component with the Storybook APIs
const GitHubSearchPanel = ({ active }) => {
  if (!active) return null;

  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const state = useStorybookState(); // Get Storybook API instance

  const currentComponentName = useMemo(() => {
    return extractComponentName(
      state?.index?.[state?.storyId]?.importPath ?? ''
    );
  }, [state?.index?.[state?.storyId]]);

  const [selectedRepos, setSelectedRepos] = useState([...REPO_LIST]);

  const handleOnRepoSelect = (changes) => {
    setSelectedRepos(changes.selectedItems);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const query = `"<${currentComponentName}" ${selectedRepos.map((repo) => `repo:${repo}`).join(' ')}`;

    const repoMap = {};
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `/github-search/?q=${encodeURIComponent(query)}&per_page=${PER_PAGE}&page=${page}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('GitHub API response was not ok');
        }

        const data = await response.json();

        hasMore = data.items.length === PER_PAGE;

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
      <Autocomplete
        label="Repositories"
        multiple
        selectedOptions={selectedRepos}
        options={REPO_LIST}
        onOptionsChange={handleOnRepoSelect}
      />

      <Button
        onClick={handleSearch}
        disabled={loading || currentComponentName === undefined}
      >
        Search for {currentComponentName} in Repositories
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
