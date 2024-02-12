import transformToCommitList from './groupedCommits.cjs';

describe('transformToCommitList', () => {
  test('Should return an empty object when no commits are available', () => {
    const commits = {};
    const options = { data: { root: { commits: {} } } };
    transformToCommitList(commits, options);
    expect(options.data.root.commits).toEqual({});
  });

  test('Should group commit under specific label when a group rule is set for given emoji', () => {
    const commit = {
      subject: ' fixing a bug',
      gitmoji: '🐛',
    };
    const commits = {
      '🐛': [commit],
    };
    const options = { data: { root: { commits } } };
    transformToCommitList(commits, options);
    expect(options.data.root.commits).toEqual([
      {
        group: 'fixed',
        label: 'Fixed',
        cList: [commit],
      },
    ]);
  });
  test('Should group various commits under same label when a group rule is set for given emojis', () => {
    const commit = {
      subject: ' fixing a bug',
      gitmoji: '🐛',
    };
    const critCommit = {
      subject: ' fixing a critical bug',
      gitmoji: '🚑️',
    };
    const commits = {
      '🐛': [commit],
      '🚑️': [critCommit],
    };
    const options = { data: { root: { commits } } };
    transformToCommitList(commits, options);
    expect(options.data.root.commits).toEqual([
      {
        group: 'fixed',
        label: 'Fixed',
        cList: [commit, critCommit],
      },
    ]);
  });
  test('Should group the male construction_worker 👷‍♂️ same as the female equivalent', () => {
    const commit = {
      subject: ' update ci system',
    };
    const commits = {
      '👷‍♂️': [commit],
      '👷': [commit],
    };
    const options = { data: { root: { commits } } };
    transformToCommitList(commits, options);
    expect(options.data.root.commits).toEqual([
      {
        group: 'added',
        label: 'Added',
        cList: [commit, commit],
      },
    ]);
  });
  test('Should ignore commit when a group rule is not set for given emoji', () => {
    const commits = {
      '🔖': [
        {
          subject: ' updated documentation',
        },
      ],
    };
    const options = { data: { root: { commits } } };
    transformToCommitList(commits, options);
    expect(options.data.root.commits).toEqual([]);
  });
});
