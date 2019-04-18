import Jenkins from 'jenkins';

const getJenkinsUrl = () => {
  const setting = JSON.parse(localStorage.getItem('setting'));

  const url = setting.url.replace(/https?:\/\//, '');

  return `https://${setting.username}:${setting.key}@${url}`;
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
