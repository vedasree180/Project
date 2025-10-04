import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/dashboard-stats')
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <div className="card">
        <h3>Total Publications</h3>
        <CountUp end={stats.totalPublications} duration={1.5} />
        <p>Change: +{stats.publicationsChange}%</p>
      </div>

      <div className="card">
        <h3>Research Teams</h3>
        <CountUp end={stats.researchTeams} duration={1.5} />
        <p>Change: +{stats.teamsChange}%</p>
      </div>

      <div className="card">
        <h3>Success Rate</h3>
        <CountUp end={stats.successRate} duration={1.5} />%
        <p>Change: +{stats.successChange}%</p>
      </div>

      <div className="card">
        <h3>Countries</h3>
        <CountUp end={stats.countries} duration={1.5} />
        <p>Change: +{stats.countriesChange}%</p>
      </div>
    </div>
  );
}
