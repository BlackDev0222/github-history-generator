// createRealHistory = require('./createRealHistory');
// createRealHistory();

const workHistorys = [
  {
    startDate: "2022-11-18",
    endDate: "2022-12-31",
    workDaysCount: 30,
    maxCommitsCount: 10
  },
  {
    startDate: "2023-01-03",
    endDate: "2023-03-26",
    workDaysCount: 60,
    maxCommitsCount: 6
  },
];

const createFakeHistory = require('./createFakeHistory');
createFakeHistory(workHistorys);