const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require("moment");
const process = require('process');

const getRandomCommits = (workHistory) => {
  const startDate = moment(workHistory.startDate);
  const endDate = moment(workHistory.endDate);
  const duration = moment.duration(endDate.diff(startDate)).asDays();

  let zerosCount = 0, commits = [];
  const zeroRate = (duration - workHistory.workDaysCount) / parseFloat(duration);
  for (let i = 0; i < duration; i++) {
    if (zerosCount < duration * zeroRate && Math.random() < zeroRate) {
      // randomly add a zero to the list
      commits.push({
        date: startDate.clone().add(i, 'days').format('YYYY-MM-DD'),
        count: 0
      });
      zerosCount++;
    } else {
      // add a random non-zero integer to the list
      commits.push({
        date: startDate.clone().add(i, 'days').format('YYYY-MM-DD'),
        count: Math.floor(Math.random() * workHistory.maxCommitsCount) + 1
      });
    }
  }
  return commits;
}

const writeCommitHistory = async (workHistorys) => {
  fs.mkdir('my-history', (error) => {
    if (!error) {
      console.log("Successfully created `my-history` directory.");
    } else {
      console.log("`my-history` already exists.");
    }
  });
  process.chdir('my-history');
  for (let i = 0; i < workHistorys.length; i++) {
    const workHistory = workHistorys[i];
    const commits = getRandomCommits(workHistory);

    for (let j = 0; j < commits.length; j++) {
      const commit = commits[j];

      console.log(commit.date);
      for (let k = 0; k < commit.count; k++) {
        await exec(`echo ${commit.date + " " + k} > main.txt`);
        await exec(`git add .`);
        await exec(`git commit --quiet --date "${commit.date}" -m "commit ${commit.date + " " + k}"`);
      }
    }
  }
  await exec(`git branch -M master`);
  await exec(`git push -u origin master`);
}

module.exports = writeCommitHistory;