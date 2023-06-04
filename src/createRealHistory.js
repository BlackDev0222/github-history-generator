const fs = require('fs');
const path = require('path');
const glob = require('glob');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const moment = require("moment");
const process = require('process');


let workHistory = {
  startDate: "2016-06-18",
  endDate: "2020-10-11",
  workDaysCount: 0,
  maxCommitsCount: 14
};

const getRandomCommits = (workHistory) => {
  const startDate = moment(workHistory.startDate);
  const endDate = moment(workHistory.endDate);
  const duration = moment.duration(endDate.diff(startDate)).asDays();

  let zerosCount = 0, commits = [];
  const zeroRate = (duration - workHistory.workDaysCount) / parseFloat(duration);
  for (let i = 0; i < duration; i++) {
    if (zerosCount < duration * zeroRate && Math.random() < zeroRate) {
      // randomly add a zero to the list
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

const createRealHistory = async () => {
  process.chdir('my-history');

  const files = glob.sync(process.cwd() + "/**/*", { nodir: true });
  workHistory.workDaysCount = files.length;

  const commits = getRandomCommits(workHistory);

  for (let i = 0; i < Math.min(commits.length, files.length); i++) {
    console.log(`git add ${files[i]}`);
    console.log(`git commit --quiet --date "${commits[i] ? commits[i].date : commits[commits.length - 1].date}" -m "update ${files[i]}"`);

    await exec(`git add "${files[i]}"`);
    await exec(`git commit --quiet --date "${commits[i] ? commits[i].date : commits[commits.length - 1].date}" -m "update ${files[i]}"`);
  }
  await exec(`git push -u origin master`);
}

module.exports = createRealHistory;