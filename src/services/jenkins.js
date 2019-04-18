import Jenkins from 'jenkins';

const getJenkinsUrl = () => {
  const account = JSON.parse(localStorage.getItem('account'));

  const url = account.url.replace(/https?:\/\//, '');

  return `https://${account.username}:${account.key}@${url}`;
};

export const getJobs = async () => {
  const url = getJenkinsUrl();

  const jenkins = Jenkins({
    baseUrl: url,
    promisify: true
  });

  return jenkins.info();
};

export const getJobParameter = async (jobName) => {
  const url = getJenkinsUrl();

  const jenkins = Jenkins({
    baseUrl: url,
    promisify: true
  });

  const jobInfo = await jenkins.job.get(jobName);
  const { parameterDefinitions: jobParametersList } = jobInfo.actions.find(
    ({ _class }) => _class === 'hudson.model.ParametersDefinitionProperty'
  );

  return jobParametersList;
};
