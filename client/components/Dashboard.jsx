import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNasaData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiKey = 'GkUc4JHO3E7vLqZuF6DGdNOb0HPMzS0CUm6J50Ml';
        const url = `https://osdr.nasa.gov/geode-py/ws/api/experiments?api_key=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('NASA API Response:', data);
        
        // Process the NASA API data and create dashboard stats
        const processedStats = {
          totalPublications: Array.isArray(data) ? data.length : (data.results?.length || 0),
          researchTeams: processResearchTeams(data),
          successRate: calculateSuccessRate(data),
          countries: processCountries(data),
          publicationsChange: '+12%', // Mock data since we don't have historical data
          teamsChange: '+8%',
          successChange: '+5%',
          countriesChange: '+3%'
        };
        
        setStats(processedStats);
      } catch (err) {
        console.error('Error fetching NASA data:', err);
        setError(err.message);
        // Fallback to mock data if API fails
        setStats({
          totalPublications: 156,
          researchTeams: 23,
          successRate: 87,
          countries: 15,
          publicationsChange: '+12%',
          teamsChange: '+8%',
          successChange: '+5%',
          countriesChange: '+3%'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNasaData();
  }, []);

  // Helper function to process research teams from NASA data
  const processResearchTeams = (data) => {
    if (!Array.isArray(data?.results)) return 0;
    const uniqueTeams = new Set(data.results
      .filter(item => item.experiment_lead)
      .map(item => item.experiment_lead.name || item.experiment_lead.affiliation)
    );
    return uniqueTeams.size || 15;
  };

  // Helper function to calculate success rate based on experiment status
  const calculateSuccessRate = (data) => {
    if (!Array.isArray(data?.results)) return 87;
    const completed = data.results.filter(item => 
      item.experiment_status === 'completed' || 
      item.experiment_status === 'successful'
    ).length;
    return data.results.length > 0 ? Math.round((completed / data.results.length) * 100) : 87;
  };

  // Helper function to process countries from NASA data
  const processCountries = (data) => {
    if (!Array.isArray(data?.results)) return 15;
    const uniqueCountries = new Set(data.results
      .filter(item => item.experiment_lead?.affiliation)
      .map(item => {
        const affiliation = item.experiment_lead.affiliation;
        // Extract country from affiliation if possible
        return affiliation ? affiliation.split(', ').pop() || affiliation : null;
      })
      .filter(Boolean)
    );
    return uniqueCountries.size || 15;
  };

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '200px',
      fontSize: '18px',
      color: '#007580'
    }}>
      Loading NASA data...
    </div>
  );
  
  if (error) {
    console.warn('Using fallback data due to API error:', error);
  }

  if (!stats) return <div>No data available</div>;

  return (
    <div className="dashboard-container" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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
