const gitmojis = require('gitmojis').gitmojis;

const groupMappings = require('../groupMapping.cjs');

const maleConstructionWorker = '👷‍♂️';

const transformToGroupedCommitList = (commits, options) => {
  const commitlist = [];
  const keys = Object.keys(commits);
  if (Object.keys(commits).length > 0) {
    for (const gitmojiIndex in keys) {
      const emoji =
        gitmojis.find((g) => {
          // The gitcomji package does not handle gender or skin color
          if (keys[gitmojiIndex] === maleConstructionWorker) {
            return g.name === 'construction-worker';
          }
          return g.emoji === keys[gitmojiIndex];
        }) || {};

      const group = groupMappings.find((g) => {
        return g.emojis.includes((emoji.code || '').replaceAll(':', ''));
      });
      if (group) {
        const exist = commitlist.findIndex(
          (groups) => groups.group === group.group
        );
        if (exist !== -1) {
          commitlist[exist].cList = [
            ...commitlist[exist].cList,
            ...commits[keys[gitmojiIndex]],
          ];
        } else {
          commitlist.push({
            group: group.group,
            label: group.label,
            cList: commits[keys[gitmojiIndex]],
          });
        }
      } else {
        console.log(
          `Did not find a matching grouping rule for ${keys[gitmojiIndex]}`
        );
      }
    }
    options.data.root['commits'] = commitlist;
  }
};

module.exports = transformToGroupedCommitList;
