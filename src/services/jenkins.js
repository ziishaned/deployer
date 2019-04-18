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
