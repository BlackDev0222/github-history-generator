# 1. Create "my-history" repository as a private one on your github.
# 2. Go to "my-history" directory and follow below git commands.
```python
git init
git remote add origin https://github.com/******/my-history.git
```
# 3. Go to index.js and modify your work history data.
```python
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
```
# 4. Run github-history-generator
```python
node src/index.js
```